"use client";

import { useState, useEffect } from "react";
import { Group } from "@/types/password";
import { GlassCard } from "./GlassCard";

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: Omit<Group, "id">) => void;
  editGroup?: Group | null;
}

const PRESET_COLORS = [
  "#7E52FF",
  "#B9E919",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
  "#F8B739",
  "#52B788",
];

export const GroupModal = ({
  isOpen,
  onClose,
  onSave,
  editGroup,
}: GroupModalProps) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);

  useEffect(() => {
    if (editGroup) {
      setName(editGroup.name);
      setColor(editGroup.color);
    } else {
      setName("");
      setColor(PRESET_COLORS[0]);
    }
  }, [editGroup, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onSave({ name, color });
    setName("");
    setColor(PRESET_COLORS[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      data-oid="uv49hbl"
    >
      <GlassCard className="w-full max-w-md p-6" data-oid="py4-:et">
        <div
          className="flex items-center justify-between mb-6"
          data-oid="mwhypyt"
        >
          <h2 className="text-2xl font-semibold text-white" data-oid="wg99udw">
            {editGroup ? "Редактировать группу" : "Создать группу"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary transition-colors"
            data-oid="k.j_-vk"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="h29n43y"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                data-oid="p0fzdsk"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" data-oid="w.08to1">
          <div data-oid="-_kr4a2">
            <label
              className="block text-sm font-medium text-secondary mb-2"
              data-oid="bl-ior1"
            >
              Название группы *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-dark-bg/60 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-secondary/50"
              placeholder="Например, Социальные сети"
              required
              data-oid="lcy838k"
            />
          </div>

          <div data-oid="bod--tj">
            <label
              className="block text-sm font-medium text-secondary mb-2"
              data-oid="1vhqz3y"
            >
              Цвет
            </label>
            <div className="grid grid-cols-6 gap-2" data-oid="41c2:ig">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  onClick={() => setColor(presetColor)}
                  className={`w-full aspect-square rounded-lg transition-all ${
                    color === presetColor
                      ? "ring-2 ring-offset-2 ring-offset-card-bg ring-accent scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: presetColor }}
                  data-oid="o-u9i1w"
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4" data-oid="x3h:rau">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg text-white font-medium transition-colors"
              data-oid="7bz_z-n"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#b9e919] hover:bg-[#8FA446] text-[#3A3A3A] rounded-lg text-white font-medium transition-colors"
              data-oid="52t40on"
            >
              {editGroup ? "Сохранить" : "Создать"}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
