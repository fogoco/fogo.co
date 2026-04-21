"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Eye,
  EyeOff,
  Copy,
  Trash2,
  GripVertical,
  Plus,
  Save,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";
import type { AnyBlock, BlockType } from "@/lib/blocks/types";
import { blockLibrary, getBlockDefinition } from "@/lib/blocks/registry";
import { PageRenderer } from "@/components/blocks/Renderer";
import { saveDraftAction, publishAction } from "@/app/admin/builder/actions";
import { Inspector } from "./Inspector";

export function Builder({
  pageId,
  pageTitle,
  initialBlocks,
}: {
  pageId: string | null;
  pageTitle: string;
  initialBlocks: AnyBlock[];
}) {
  const [blocks, setBlocks] = useState<AnyBlock[]>(initialBlocks);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialBlocks[0]?.id ?? null
  );
  const [isPending, startTransition] = useTransition();
  const [showLibrary, setShowLibrary] = useState(false);

  const selected = useMemo(
    () => blocks.find((b) => b.id === selectedId) ?? null,
    [blocks, selectedId]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  // Autosave debounce
  useEffect(() => {
    if (!pageId) return;
    const t = setTimeout(() => {
      startTransition(async () => {
        try {
          await saveDraftAction(pageId, blocks);
        } catch (e) {
          console.error(e);
        }
      });
    }, 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks, pageId]);

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setBlocks((items) => {
      const oldIdx = items.findIndex((i) => i.id === active.id);
      const newIdx = items.findIndex((i) => i.id === over.id);
      const reordered = arrayMove(items, oldIdx, newIdx).map((b, i) => ({
        ...b,
        position: i,
      }));
      return reordered;
    });
  }

  function toggleVisibility(id: string) {
    setBlocks((bs) =>
      bs.map((b) => (b.id === id ? { ...b, visible: !b.visible } : b))
    );
  }

  function duplicateBlock(id: string) {
    setBlocks((bs) => {
      const idx = bs.findIndex((b) => b.id === id);
      if (idx < 0) return bs;
      const clone = {
        ...bs[idx],
        id: `${bs[idx].type}-${Date.now()}`,
      } as AnyBlock;
      const next = [...bs.slice(0, idx + 1), clone, ...bs.slice(idx + 1)];
      return next.map((b, i) => ({ ...b, position: i }));
    });
  }

  function deleteBlock(id: string) {
    if (!confirm("Delete this block?")) return;
    setBlocks((bs) =>
      bs.filter((b) => b.id !== id).map((b, i) => ({ ...b, position: i }))
    );
    if (selectedId === id) setSelectedId(null);
  }

  function addBlock(type: BlockType) {
    const def = getBlockDefinition(type);
    if (!def) return;
    const block = {
      id: `${type}-${Date.now()}`,
      type,
      visible: true,
      position: blocks.length,
      data: structuredClone(def.defaultData),
    } as AnyBlock;
    setBlocks((bs) => [...bs, block]);
    setSelectedId(block.id);
    setShowLibrary(false);
  }

  function updateSelected(patch: Partial<AnyBlock["data"]>) {
    if (!selected) return;
    setBlocks((bs) =>
      bs.map((b) =>
        b.id === selected.id
          ? ({ ...b, data: { ...b.data, ...patch } } as AnyBlock)
          : b
      )
    );
  }

  async function handlePublish() {
    if (!pageId) {
      toast.error("Page not initialised. Run the seed script first.");
      return;
    }
    try {
      await publishAction(pageId, blocks);
      toast.success("Published");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <div className="grid h-screen grid-cols-[320px_1fr_360px] bg-background">
      {/* LEFT: sections list */}
      <aside className="flex flex-col border-r border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Page
            </p>
            <p className="font-display text-lg">{pageTitle}</p>
          </div>
          <button
            onClick={() => setShowLibrary((v) => !v)}
            className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs hover:bg-muted/70"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>

        {showLibrary && (
          <div className="border-b border-border px-4 py-3">
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Block library
            </p>
            <div className="grid grid-cols-2 gap-2">
              {blockLibrary.map((b) => (
                <button
                  key={b.type}
                  onClick={() => addBlock(b.type)}
                  className="rounded-md border border-border bg-background p-2 text-left text-xs hover:border-ember-500/50"
                >
                  <p className="font-medium">{b.label}</p>
                  <p className="mt-1 line-clamp-2 text-[10px] text-muted-foreground">
                    {b.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1.5">
                {blocks.map((b) => (
                  <SortableItem
                    key={b.id}
                    block={b}
                    selected={b.id === selectedId}
                    onSelect={() => setSelectedId(b.id)}
                    onToggle={() => toggleVisibility(b.id)}
                    onDuplicate={() => duplicateBlock(b.id)}
                    onDelete={() => deleteBlock(b.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border p-3">
          <span className="text-xs text-muted-foreground">
            {isPending ? "Saving draft..." : "Draft saved"}
          </span>
          <button
            onClick={handlePublish}
            className="flex items-center gap-1.5 rounded-full bg-ember-500 px-4 py-2 text-xs font-medium text-white hover:bg-ember-600"
          >
            <Rocket className="h-3.5 w-3.5" /> Publish
          </button>
        </div>
      </aside>

      {/* CENTER: preview */}
      <section className="overflow-y-auto bg-background">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/80 px-6 py-3 backdrop-blur">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Live preview
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Save className="h-3.5 w-3.5" /> Autosaving
          </div>
        </div>
        <div className="bg-grain">
          <PageRenderer blocks={blocks} />
        </div>
      </section>

      {/* RIGHT: inspector */}
      <aside className="overflow-y-auto border-l border-border bg-card">
        <Inspector
          block={selected}
          onChange={(patch) => updateSelected(patch)}
        />
      </aside>
    </div>
  );
}

function SortableItem({
  block,
  selected,
  onSelect,
  onToggle,
  onDuplicate,
  onDelete,
}: {
  block: AnyBlock;
  selected: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });
  const def = getBlockDefinition(block.type);

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
      }}
      onClick={onSelect}
      className={`group flex items-center gap-2 rounded-md border px-2 py-2 text-sm transition ${
        selected
          ? "border-ember-500/60 bg-ember-500/5"
          : "border-border bg-background hover:border-border/70"
      } ${!block.visible ? "opacity-60" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="flex-1 truncate">{def?.label ?? block.type}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="text-muted-foreground hover:text-foreground"
        title={block.visible ? "Hide" : "Show"}
      >
        {block.visible ? (
          <Eye className="h-3.5 w-3.5" />
        ) : (
          <EyeOff className="h-3.5 w-3.5" />
        )}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDuplicate();
        }}
        className="text-muted-foreground hover:text-foreground"
        title="Duplicate"
      >
        <Copy className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-muted-foreground hover:text-red-400"
        title="Delete"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
