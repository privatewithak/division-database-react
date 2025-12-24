import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import { BASE_STYLES } from "./data/themes";
import LayoutBttn from "./reusables/LayoutBttn";
import mockData from "./data/layoutMock";
import {cx} from './data/themes'
import { DIV_ORDER } from './data/rankorders';
import { RANK_ORDER } from './data/rankorders';
import { ACADEMY_RANK_ORDER } from './data/layoutMock';


import type { MockData } from "./data/layoutMock"

export default function Layout({ mode }: { mode: 'CCA' | 'OTA' }) {

    const [selectedDiv, setSelectedDiv] = useState<string | null>(null);
    const [selectedRank, setSelectedRank] = useState<MockData['rank'] | null>(null);
    const [query, setQuery] = useState<string>('');
    const [activeUser, setActiveUser] = useState<MockData | null>(null);
  
  
  
    const modeData = useMemo(() => mockData.filter((u) => u.typeID === mode), [mode]);
    
    const getRankOrder = (mode: "CCA" | "OTA", division: string | null) => {
  if (mode === "CCA" && division === "ACADEMY") return ACADEMY_RANK_ORDER;
  return RANK_ORDER[mode];
};

const divisions = useMemo(() => {
  const present = Array.from(new Set(modeData.map((u) => u.division)));
  const ordered = DIV_ORDER[mode].filter((d) => present.includes(d));
  const rest = present.filter((d) => !ordered.includes(d)).sort();
  return [...ordered, ...rest];
}, [mode, modeData]);

const ranks = useMemo(() => {
  if (!selectedDiv) return [];
  const present = Array.from(
    new Set(modeData.filter((u) => u.division === selectedDiv).map((u) => u.rank))
  );

  const order = getRankOrder(mode, selectedDiv);
  return present.sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai === -1 && bi === -1) return String(a).localeCompare(String(b));
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}, [mode, modeData, selectedDiv]);

const filteredUsers = useMemo(() => {
  const q = query.trim().toLowerCase();

  return modeData.filter((u) => {
    if (selectedDiv && u.division !== selectedDiv) return false;
    if (selectedRank && u.rank !== selectedRank) return false;
    if (!q) return true;

    return (
      u.username.toLowerCase().includes(q) ||
      String(u.RobloxUserId).includes(q)
    );
  });
}, [modeData, query, selectedDiv, selectedRank]);
    
const switchDivision = useCallback((division: string) => {
  setSelectedDiv((prev) => (prev === division ? null : division));
  setSelectedRank(null);
}, []);

const clearFilters = useCallback(() => {
  setSelectedDiv(null);
  setSelectedRank(null);
  setQuery("");
}, []);

const hasFilters = Boolean(selectedDiv || selectedRank || query.trim());

    return (
        <>
  <section className="w-full">
          <AnimatePresence mode="wait">
            <LayoutGroup key={mode}>
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 10, filter: "blur(6px)", }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={cx(
          "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl",
          "shadow-[0_18px_60px_-30px_rgba(0,0,0,0.65)]",
          "before:absolute before:inset-0 before:pointer-events-none before:opacity-60",
          "before:bg-[radial-gradient(1200px_circle_at_15%_-10%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(900px_circle_at_90%_0%,rgba(255,255,255,0.10),transparent_40%)]",
          BASE_STYLES[mode]
        )}
      >
        <div className="relative p-5 sm:p-6">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-white text-xl sm:text-2xl font-semibold tracking-tight">
                Dashboard
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/70 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Users: {filteredUsers.length}/{modeData.length}
              </span>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-white/70 rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 h-px w-full bg-white/10" />

          {/* Controls */}
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              {/* Divisions row (scrollable horizontally) */}
              <div className="flex items-center gap-2 overflow-x-visible overflow-y-visible py-6 relative rounded-xl px-4 [-ms-overflow-style:none] ">
                {divisions.map((div) => (
                  <LayoutBttn
                    key={div}
                    mode={mode}
                    isActive={selectedDiv === div}
                    onClick={() => switchDivision(div)}
                    className="flex-none px-4 py-2 text-sm rounded-xl hover:-translate-y-0 hover:scale-100"
                  >
                    {div}
                  </LayoutBttn>
                ))}
              </div>

              {/* Search */}
              <div className="w-full md:w-[280px]">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search username / id"
                  className={cx(
                    "w-full rounded-xl border border-white/10 bg-white/5",
                    "px-3 py-2 text-sm text-white placeholder:text-white/30",
                    "outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent",
                    mode === "CCA"
                      ? "focus:ring-blue-400/40"
                      : "focus:ring-red-400/40"
                  )}
                />
              </div>
            </div>

            {/* Body grid (hard cap height) */}
 <AnimatePresence mode="wait" initial={false}>
  {activeUser ? (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="min-h-0"
    >
      <UserProfileView user={activeUser} mode={mode} onBack={() => setActiveUser(null)} />
    </motion.div>
  ) : (
    <motion.div
      key="grid"
      layout
      transition={{ layout: { duration: 0.28, ease: "easeOut" } }}
      className={cx("grid grid-cols-12 gap-4 min-h-0", "h-120")}
    >
      {/* Ranks panel */}
      <motion.div layout="size" className="col-span-12 lg:col-span-4 min-h-0 h-full">
        <div className="h-full min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl flex flex-col">
          <div className="shrink-0 flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
            <p className="text-white/75 text-sm font-medium">Ranks</p>
            <p className="text-white/40 text-xs">
              {selectedDiv ? `${ranks.length} found` : "Pick division"}
            </p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-3 pb-6">
            {!selectedDiv ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-white/45 text-sm">Choose a division to load ranks.</p>
              </div>
            ) : ranks.length === 0 ? (
              <p className="text-white/45 text-sm px-1">No ranks for this division.</p>
            ) : (
              <motion.div layout className="flex flex-col gap-2">
                {ranks.map((rank) => (
                  <LayoutBttn
                    key={rank}
                    mode={mode}
                    isActive={selectedRank === rank}
                    onClick={() => setSelectedRank(rank)}
                    className="w-full justify-start px-4 py-2 text-sm rounded-xl hover:-translate-y-0 hover:scale-100"
                  >
                    {rank}
                  </LayoutBttn>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Users panel */}
      <motion.div layout="size" className="col-span-12 lg:col-span-8 min-h-0 h-full">
        <div className="h-full min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl flex flex-col">
          <div className="shrink-0 flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
            <p className="text-white/75 text-sm font-medium">Users</p>
            <p className="text-white/40 text-xs">{filteredUsers.length} shown</p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-3 pb-6">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-white/45">No users found</p>
                <p className="text-white/25 text-sm mt-1">Clear filters or tweak the search.</p>
              </div>
            ) : (
              <motion.ul layout className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {filteredUsers.map((u) => (
                    <motion.li
                      key={`${u.RobloxUserId}-${u.division}-${u.rank}`}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveUser(u)}
                        className={cx(
                          "w-full text-left group rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3",
                          "hover:bg-white/[0.06] transition-colors",
                          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent",
                          mode === "CCA" ? "focus:ring-blue-400/40" : "focus:ring-red-400/40"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-white font-semibold truncate">{u.username}</p>
                            <p className="text-white/45 text-xs mt-0.5">ID {u.RobloxUserId}</p>
                          </div>

                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-[11px] text-white/70 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                              {u.division}
                            </span>
                            <span className="text-[11px] text-white/70 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                              {u.rank}
                            </span>
                          </div>
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
          </div>
        </div>
              </motion.div>
      </LayoutGroup>
    </AnimatePresence>
  </section>
        </>
    )
}

function UserProfileView({
  user,
  mode,
  onBack,
}: {
  user: MockData;
  mode: "CCA" | "OTA";
  onBack: () => void;
}) {
  const initials = user.username
    .split(/[_\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="min-h-0">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className={cx(
            "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80",
            "hover:bg-white/10 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent",
            mode === "CCA" ? "focus:ring-blue-400/40" : "focus:ring-red-400/40"
          )}
        >
          ← Back
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/70 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Profile
          </span>
          <span className="text-xs text-white/70 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {user.typeID}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 min-h-0 h-120">
        <div className="col-span-12 lg:col-span-4 min-h-0 h-full">
          <div className="h-full min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white font-semibold">
                {initials || "U"}
              </div>

              <div className="min-w-0">
                <p className="text-white font-semibold truncate">{user.username}</p>
                <p className="text-white/45 text-xs mt-0.5">ID {user.RobloxUserId}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-white/70 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Division: {user.division}
              </span>
              <span className="text-xs text-white/70 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Rank: {user.rank}
              </span>
            </div>

            <div className="mt-4 h-px w-full bg-white/10" />

            <p className="mt-4 text-white/45 text-sm">
              {user.username}'s profile page. They are {['D5', 'D4', 'D3', 'D2', 'D1'].includes(user.rank) ? (<span>{user.rank} Protection Unit</span>) : user.rank} in {user.division} division of {user.typeID}.
            </p>
          </div>
        </div>

        
        <div className="col-span-12 lg:col-span-8 min-h-0 h-full">
          <div className="h-full min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl flex flex-col">
            <div className="shrink-0 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <p className="text-white/75 text-sm font-medium">Details</p>
              <span className="text-white/40 text-xs">v1.0</span>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-4 pb-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-white font-semibold">User snapshot</p>
                <div className="mt-3 grid grid-cols-12 gap-3 text-sm">
                  <div className="col-span-12 sm:col-span-6">
                    <p className="text-white/40 text-xs">Division</p>
                    <p className="text-white/85">{user.division}</p>
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <p className="text-white/40 text-xs">Rank</p>
                    <p className="text-white/85">{user.rank}</p>
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <p className="text-white/40 text-xs">Mode</p>
                    <p className="text-white/85">{user.typeID}</p>
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <p className="text-white/40 text-xs">RobloxUserId</p>
                    <p className="text-white/85">{user.RobloxUserId}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-white font-semibold">Timeline</p>
                <p className="text-white/45 text-sm mt-1">
                  Events history
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}