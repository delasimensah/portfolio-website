# 🧩 Component Building Guide

This guide outlines best practices for building components in this project.

## 📋 Component Structure

### **File Organization**

```
components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
└── index.ts
```

**Note:** All components are exported from `components/index.ts` at the root level, not from category-level index files.

### **Component Definition**

**Standard Components:** Always use `React.FC` with typed props:

```typescript
import React from "react";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
}) => {
  return (
    <button onClick={onPress} className={variant}>
      {title}
    </button>
  );
};

export default Button;
```

**Generic Components:** For components with generic type parameters (e.g., `<T>`), use arrow functions **without** `React.FC` because `React.FC` doesn't support generic types:

```typescript
import React from "react";

interface ListContainerProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  keyExtractor?: (item: T) => string;
}

const ListContainer = <T extends { id: string | number }>({
  data,
  renderItem,
  keyExtractor = (item) => String(item.id),
}: ListContainerProps<T>): React.ReactElement => {
  return (
    <div>
      {data.map((item) => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
};

export default ListContainer;
```

**Key Points for Generic Components:**

- Use `const` with arrow function syntax (not `React.FC`)
- Generic `<T>` comes after the component name
- Use explicit return type `: React.ReactElement` (or `React.ReactNode` if needed)
- **Do not** use `React.FC` with generic components

## 🎨 Styling

### **Mobile (NativeWind)**

```typescript
import { View, Text } from "react-native";

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <View className="bg-white rounded-lg p-4 shadow-md">
      {children}
    </View>
  );
};

export default Card;
```

### **Web (Tailwind CSS)**

```typescript
import { cn } from "shared";

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn("bg-white rounded-lg p-4 shadow-md", className)}>
      {children}
    </div>
  );
};

export default Card;
```

## ✅ Best Practices

1. **Type Safety**: Always define props interfaces
2. **Composition**: Prefer composition over complex props
3. **Reusability**: Make components reusable and configurable
4. **Testing**: Write tests for all components
5. **Documentation**: Add JSDoc comments for complex components

---

_For more details, see the component organization guide._
