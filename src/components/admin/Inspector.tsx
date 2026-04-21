"use client";

import type { AnyBlock } from "@/lib/blocks/types";
import { getBlockDefinition } from "@/lib/blocks/registry";

export function Inspector({
  block,
  onChange,
}: {
  block: AnyBlock | null;
  onChange: (patch: Partial<AnyBlock["data"]>) => void;
}) {
  if (!block) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Select a block to edit its content.
      </div>
    );
  }

  const def = getBlockDefinition(block.type);
  const data = block.data as Record<string, any>;

  return (
    <div className="p-5">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        Editing
      </p>
      <h3 className="font-display text-xl">{def?.label}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{def?.description}</p>

      <div className="mt-6 space-y-4">
        {Object.entries(data).map(([key, value]) =>
          renderField(key, value, (newValue) => onChange({ [key]: newValue } as any))
        )}
      </div>
    </div>
  );
}

function renderField(key: string, value: any, onChange: (v: any) => void) {
  // Primitive
  if (typeof value === "string") {
    const isLong = value.length > 80 || key === "body" || key === "subheadline";
    return (
      <LabeledField key={key} label={prettify(key)}>
        {isLong ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls + " min-h-[90px]"}
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
          />
        )}
      </LabeledField>
    );
  }
  if (typeof value === "number") {
    return (
      <LabeledField key={key} label={prettify(key)}>
        <input
          type="number"
          step="0.05"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={inputCls}
        />
      </LabeledField>
    );
  }
  if (typeof value === "boolean") {
    return (
      <label key={key} className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        {prettify(key)}
      </label>
    );
  }

  // CTA object
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "label" in value &&
    "href" in value
  ) {
    return (
      <LabeledField key={key} label={prettify(key)}>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={value.label}
            onChange={(e) => onChange({ ...value, label: e.target.value })}
            className={inputCls}
            placeholder="Label"
          />
          <input
            value={value.href}
            onChange={(e) => onChange({ ...value, href: e.target.value })}
            className={inputCls}
            placeholder="#section"
          />
        </div>
      </LabeledField>
    );
  }

  // Array of items
  if (Array.isArray(value)) {
    return (
      <LabeledField key={key} label={prettify(key)}>
        <div className="space-y-2">
          {value.map((item, i) => (
            <div
              key={i}
              className="rounded-md border border-border bg-background p-2.5"
            >
              {typeof item === "string" ? (
                <input
                  value={item}
                  onChange={(e) => {
                    const next = [...value];
                    next[i] = e.target.value;
                    onChange(next);
                  }}
                  className={inputCls}
                />
              ) : typeof item === "object" ? (
                <div className="space-y-1.5">
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k}>
                      <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                        {prettify(k)}
                      </p>
                      <input
                        value={String(v ?? "")}
                        onChange={(e) => {
                          const next = [...value];
                          next[i] = { ...item, [k]: e.target.value };
                          onChange(next);
                        }}
                        className={inputCls}
                      />
                    </div>
                  ))}
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  const next = value.filter((_, idx) => idx !== i);
                  onChange(next);
                }}
                className="mt-2 text-xs text-muted-foreground hover:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const template = value[0] ?? "";
              const next =
                typeof template === "object"
                  ? [
                      ...value,
                      Object.fromEntries(
                        Object.keys(template as object).map((k) => [k, ""])
                      ),
                    ]
                  : [...value, ""];
              onChange(next);
            }}
            className="w-full rounded-md border border-dashed border-border py-1.5 text-xs text-muted-foreground hover:border-ember-500/60 hover:text-foreground"
          >
            + Add item
          </button>
        </div>
      </LabeledField>
    );
  }

  return null;
}

function LabeledField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

function prettify(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ember-500";
