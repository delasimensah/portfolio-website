# Mantine Component Development Guide

## Overview

This guide explains how to use Mantine UI components in the web project, following our customization strategy with Tailwind CSS and project standards.

## Core Principles

### 1. Use Mantine Components as Foundation

- **Prefer Mantine over HTML**: Use `Stack`, `Group`, `Text`, `Title`, `Button` instead of `<div>`, `<p>`, `<h1>`, etc.
- **Customize with Tailwind**: Apply Tailwind classes via `className` prop
- **Build custom only when needed**: Create from scratch only if Mantine can't provide it

### 2. Color Management (CRITICAL)

- ✅ **Use Tailwind classes**: `bg-primary`, `text-white`, `border-border`
- ✅ **Reference COLORS constant**: Use `COLORS.primary` in theme configuration
- ❌ **NO hardcoded hex**: Never use `bg-[#121212]`, `text-[#989898]`, etc.

### 3. Typography

- ✅ **Use project fonts**: All text uses font classes from constants
- ✅ **Mantine Text component**: Use `<Text>` instead of `<p>` tags
- ✅ **Mantine Title component**: Use `<Title>` instead of `<h1>`, `<h2>`, etc.

### 4. HTML Tag Usage

- ✅ **Use Mantine components**: Stack, Group, Flex, Text, Title, Button, Container
- ❌ **NO unnecessary HTML tags**: Don't use `<div>`, `<p>`, `<h1>` when Mantine components exist
- ✅ **Only use HTML when necessary**: `<form>`, `<a>`, semantic elements, or when Mantine doesn't provide equivalent

## Component Examples

### ❌ BAD (Anti-patterns)

```tsx
// Hardcoded colors
<div className="bg-[#121212] border-[#262626]">

// Unnecessary HTML tags
<div className="flex flex-col gap-4">
  <h1 className="text-white">Title</h1>
  <p className="text-gray-400">Description</p>
</div>

// Missing font classes
<Text>Content without font styling</Text>
```

### ✅ GOOD (Best practices)

```tsx
// Tailwind classes with project colors
<div className="bg-primary border-border">

// Mantine components with proper styling
<Stack gap="md">
  <Title order={1} className="text-white font-bold">Title</Title>
  <Text className="text-gray-400 font-regular">Description</Text>
</Stack>

// All text with font classes
<Text className="font-regular">Content with proper font</Text>
```

## Layout Components

### Stack (Vertical Layout)

```tsx
import { Stack } from '@mantine/core';

// Basic vertical stack
<Stack gap="md">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Stack>

// With custom styling
<Stack gap="lg" className="bg-darkGrey p-4">
  <Title order={2} className="text-white font-bold">Section</Title>
  <Text className="text-gray-400 font-regular">Content</Text>
</Stack>
```

### Group (Horizontal Layout)

```tsx
import { Group } from '@mantine/core';

// Basic horizontal group
<Group gap="md">
  <Button>Cancel</Button>
  <Button>Save</Button>
</Group>

// With justify and grow
<Group gap="md" justify="space-between" grow>
  <Text className="font-regular">Left content</Text>
  <Button className="bg-primary">Action</Button>
</Group>
```

## Typography Components

### Text Component

```tsx
import { Text } from '@mantine/core';

// Basic text
<Text className="font-regular">Regular text</Text>

// With size and color
<Text size="sm" className="text-gray-400 font-regular">Small muted text</Text>
```

### Title Component

```tsx
import { Title } from '@mantine/core';

// Page title
<Title order={1} className="text-white font-bold">
  Main Heading
</Title>

// Section title
<Title order={2} className="text-primary font-medium">
  Section Title
</Title>
```

## Form Components

### TextInput

```tsx
import { TextInput } from "@mantine/core";

<TextInput
  label="Email"
  placeholder="john@gmail.com"
  className="font-regular"
  {...register("email")}
  error={errors.email?.message}
/>;
```

### Button

```tsx
import { Button } from '@mantine/core';

// Primary button
<Button className="bg-primary hover:bg-primaryLight font-medium">
  Primary Action
</Button>

// Outline button
<Button
  variant="outline"
  className="border-border bg-transparent hover:bg-border font-regular"
>
  Secondary Action
</Button>
```

## Best Practices Summary

1. **Always use Mantine components** for standard UI patterns
2. **Apply Tailwind classes** for customization (NO hardcoded colors)
3. **Use project fonts** from constants
4. **Follow responsive design** (mobile-first with md/lg breakpoints)
5. **Maintain consistency** with existing patterns
6. **Test accessibility** (Mantine components are accessible by default)
7. **Keep components simple** - prefer composition over complex custom components

## Resources

- [Mantine Documentation](https://mantine.dev/)
- [Mantine Components](https://mantine.dev/core/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Project Colors Reference](../constants/colors.ts)
- [Component Building Guide](../../../docs/component-building-guide.md)
