"use client";

import { useState } from "react";
import { PasswordEntry, Group } from "@/types/password";
import { GlassCard } from "./GlassCard";

interface PasswordCardProps {
  entry: PasswordEntry;
  groups: Group[];
  onEdit: (entry: PasswordEntry) => void;
  onDelete: (id: string) => void;
}

export const PasswordCard = ({
  entry,
  groups,
  onEdit,
  onDelete,
}: PasswordCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const group = groups.find((g) => g.id === entry.groupId);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <GlassCard className="p-4 md:p-6" data-oid="9ar7gr0">
      <div className="flex items-start justify-between mb-4" data-oid="hh:rrb-">
        <div className="flex-1" data-oid="w4n:75b">
          <h3
            className="text-lg md:text-xl font-semibold text-white mb-1"
            data-oid="ap-.ydp"
          >
            {entry.serviceName}
          </h3>
          {group && (
            <span
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${group.color}20`,
                color: group.color,
              }}
              data-oid="5vev72g"
            >
              {group.name}
            </span>
          )}
        </div>
        <div className="flex gap-2" data-oid=".6qq_bb">
          <button
            onClick={() => onEdit(entry)}
            className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
            aria-label="Edit"
            data-oid="lsth4hc"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="wrz3h9z"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                data-oid="nl-7bhg"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
            aria-label="Delete"
            data-oid="-dfg87z"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="1jljmq:"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                data-oid="pb_colv"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3" data-oid="x8dfa04">
        <div
          onClick={() => copyToClipboard(entry.login, "login")}
          className="cursor-pointer md:cursor-default"
          data-oid=":5fa90-"
        >
          <div
            className="flex items-center justify-between mb-1"
            data-oid="z7tgq0l"
          >
            <label
              className="text-sm font-medium text-secondary"
              data-oid="sc:6npk"
            >
              Логин
            </label>
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(entry.login, "login");
              }}
              className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-accent/20 text-xs transition-colors bg-accent/10 hover:bg-accent/20 text-accent"
              data-oid="3r9ut71"
            >
              {copiedField === "login" ? (
                <>
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    data-oid="zngoob."
                  >
                    <path
                      d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                      data-oid="4vl.vb0"
                    />

                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                      data-oid="z0-:_-p"
                    />
                  </svg>
                  Скопировано
                </>
              ) : (
                <>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="x8p8l37"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      data-oid="gec9jh7"
                    />
                  </svg>
                  Копировать
                </>
              )}
            </button>
          </div>
          <div
            className="bg-dark-bg/60 rounded-lg px-3 py-2 text-white font-mono text-sm md:text-base break-all active:bg-dark-bg/80 md:active:bg-dark-bg/60 transition-colors"
            data-oid=".5.xfn5"
          >
            {entry.login}
            {copiedField === "login" && (
              <span
                className="md:hidden ml-2 text-accent text-xs"
                data-oid="a2i14kz"
              >
                ✓ Скопировано
              </span>
            )}
          </div>
        </div>

        <div
          onClick={() => copyToClipboard(entry.password, "password")}
          className="cursor-pointer md:cursor-default"
          data-oid="bebnpmc"
        >
          <div
            className="flex items-center justify-between mb-1"
            data-oid="b_dlo-r"
          >
            <label
              className="text-sm font-medium text-secondary"
              data-oid=".-:0jec"
            >
              Пароль
            </label>
            <div className="flex gap-2" data-oid="d72qt5c">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
                className="px-2 py-1 rounded-lg hover:bg-primary/20 text-xs transition-colors bg-primary/20 hover:bg-primary/30 text-primary"
                data-oid="lfvd.fa"
              >
                {showPassword ? "👁️ Скрыть" : "👁️ Показать"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(entry.password, "password");
                }}
                className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-xs transition-colors"
                data-oid="625h0eb"
              >
                {copiedField === "password" ? (
                  <>
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      data-oid="jjje:k6"
                    >
                      <path
                        d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                        data-oid="xg_1_k5"
                      />

                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                        data-oid="2r:xx0r"
                      />
                    </svg>
                    Скопировано
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      data-oid="4idyztg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        data-oid="8teesny"
                      />
                    </svg>
                    Копировать
                  </>
                )}
              </button>
            </div>
          </div>
          <div
            className="bg-dark-bg/60 rounded-lg px-3 py-2 text-white font-mono text-sm md:text-base break-all active:bg-dark-bg/80 md:active:bg-dark-bg/60 transition-colors"
            data-oid="zjs0_11"
          >
            {showPassword ? entry.password : "••••••••"}
            {copiedField === "password" && (
              <span
                className="md:hidden ml-2 text-accent text-xs"
                data-oid="rlxlknv"
              >
                ✓ Скопировано
              </span>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
