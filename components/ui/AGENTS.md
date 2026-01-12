# components/ui/ — Shadcn UI Components

> These components are managed by the Shadcn CLI. DO NOT manually edit these files.

## Adding Components

```bash
npx shadcn@latest add <component-name>
```

## Updating Components

Re-run the add command to update:

```bash
npx shadcn@latest add button --overwrite
```

## Installed Components

| Component | File | Purpose |
|-----------|------|---------|
| alert-dialog | alert-dialog.tsx | Confirmation dialogs |
| badge | badge.tsx | Labels, status indicators |
| button | button.tsx | Buttons with variants |
| card | card.tsx | Card containers |
| combobox | combobox.tsx | Searchable select |
| dropdown-menu | dropdown-menu.tsx | Dropdown menus |
| field | field.tsx | Form field wrapper |
| input | input.tsx | Text input |
| input-group | input-group.tsx | Input with addons |
| label | label.tsx | Form labels |
| select | select.tsx | Select dropdown |
| separator | separator.tsx | Visual divider |
| textarea | textarea.tsx | Multi-line input |

## Configuration

Components configured in `/components.json`:

- Style: `base-maia`
- Icon library: `hugeicons`
- RSC: enabled
- CSS variables: enabled

## Common Components to Add

```bash
# Dialogs & overlays
npx shadcn@latest add dialog sheet tooltip popover

# Feedback
npx shadcn@latest add toast skeleton spinner progress

# Navigation
npx shadcn@latest add tabs accordion breadcrumb

# Data display
npx shadcn@latest add table avatar

# Forms
npx shadcn@latest add checkbox radio-group switch slider
```

## Import Pattern

Always import from the specific component file:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
```
