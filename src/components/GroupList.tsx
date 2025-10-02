"use client";

import { Group } from "@/types/password";
import { GlassCard } from "./GlassCard";

interface GroupListProps {
  groups: Group[];
  selectedGroupId: string | null;
  onSelectGroup: (groupId: string | null) => void;
  onEditGroup: (group: Group) => void;
  onDeleteGroup: (groupId: string) => void;
  passwordCounts: Record<string, number>;
}

export const GroupList = ({
  groups,
  selectedGroupId,
  onSelectGroup,
  onEditGroup,
  onDeleteGroup,
  passwordCounts
}: GroupListProps) => {
  const allCount = Object.values(passwordCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="space-y-2" data-oid="l-kqvbb">
      <GlassCard
        onClick={() => onSelectGroup(null)}
        className={`p-4 ${
        selectedGroupId === null ? "bg-card-bg/90 ring-2 ring-primary/50" : ""}`
        }
        data-oid="q_uyxby">

        <div className="flex items-center justify-between" data-oid="q8pvpxh">
          <div className="flex items-center gap-3" data-oid="l.ul2::">
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg"
              data-oid="j_k1_md">

              📦
            </div>
            <div data-oid=".kr1mnv">
              <h3 className="font-semibold text-white" data-oid="k6ejpv1">
                Все
              </h3>
              <p className="text-sm text-secondary" data-oid="deso:le">
                {allCount} паролей
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {groups.map((group) => {
        const count = passwordCounts[group.id] || 0;
        return (
          <GlassCard
            key={group.id}
            onClick={() => onSelectGroup(group.id)}
            className={`p-4 ${
            selectedGroupId === group.id ?
            "bg-card-bg/90 ring-2 ring-primary/50" :
            ""}`
            }
            data-oid="s0pr20y">

            <div
              className="flex items-center justify-between"
              data-oid="vjjapqk">

              <div
                className="flex items-center gap-3 flex-1 min-w-0"
                data-oid="6mbuq-n">

                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0"
                  style={{ backgroundColor: group.color }}
                  data-oid="1:x6zqx">

                  {group.icon || "📁"}
                </div>
                <div className="min-w-0 flex-1" data-oid="d8v41p-">
                  <h3
                    className="font-semibold text-white truncate"
                    data-oid="5p2nfjo">

                    {group.name}
                  </h3>
                  <p className="text-sm text-secondary" data-oid="x5rposx">
                    {count} паролей
                  </p>
                </div>
              </div>
              <div className="flex gap-1 ml-2" data-oid="0w2l0vi">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditGroup(group);
                  }}
                  className="p-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                  aria-label="Edit group"
                  data-oid="l571var">

                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="831zw5h">

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      data-oid="78lufn2" />

                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                    confirm(
                      `Удалить группу "${group.name}"? Пароли не будут удалены.`
                    ))
                    {
                      onDeleteGroup(group.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                  aria-label="Delete group"
                  data-oid="c01blfd">

                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="1:6fn-0">

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      data-oid="j2frj:l" />

                  </svg>
                </button>
              </div>
            </div>
          </GlassCard>);

      })}
    </div>);

};