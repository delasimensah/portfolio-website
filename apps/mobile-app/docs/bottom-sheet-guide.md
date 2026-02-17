# 📋 Bottom Sheet System Guide

> **Purpose**: Centralized bottom sheet management using Zustand for consistent, scalable modals throughout the app

## 🎯 Overview

The bottom sheet system provides a centralized way to manage all bottom sheets in the application. It uses Zustand for state management and `@gorhom/bottom-sheet` for the UI components.

**Key Benefits:**

- ✅ **Centralized Management** - All bottom sheets in one place
- ✅ **Global Access** - Open sheets from any component
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Consistent Behavior** - Sheets always appear above content
- ✅ **Easy to Scale** - Clear pattern for adding new sheets

---

## 🏗️ Architecture

### **Core Components**

1. **`useBottomsheetStore`** (`hooks/bottom-sheets/useBottomsheetStore.ts`)
   - Zustand store managing refs and state
   - Provides imperative methods to open sheets
   - Stores data for sheets that need dynamic content

2. **`BottomSheetsManager`** (`components/bottom-sheets/BottomSheetsManager/BottomSheetsManager.tsx`)
   - Renders all bottom sheet components
   - Creates and registers refs with Zustand store
   - Lives in `app/(main-app)/_layout.tsx`

3. **Bottom Sheet Components**
   - Individual bottom sheet components in `components/bottom-sheets/`

---

## 🚀 Quick Start

### **Using Existing Bottom Sheets**

```tsx
import { useBottomsheetStore } from "@/hooks";

const MyComponent = () => {
  const { openMySheet } = useBottomsheetStore();

  const handleAction = () => {
    openMySheet(); // Opens the sheet
  };

  return <Button onPress={handleAction}>Open Sheet</Button>;
};
```

---

## ➕ Adding a New Bottom Sheet

### **Step 1: Create Bottom Sheet Component**

**File Structure:**

```
components/bottom-sheets/
└── MyNewBottomSheet/
    ├── MyNewBottomSheet.tsx        # All types inline
    └── MyNewBottomSheet.test.tsx
```

**Component Template:**

```tsx
// MyNewBottomSheet.tsx
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";

import { COLORS } from "@/constants";
import { VStack } from "@/components";

interface MyNewBottomSheetProps {
  title: string;
  onConfirm: () => void;
}

const MyNewBottomSheet = forwardRef<BottomSheetModal, MyNewBottomSheetProps>(
  ({ title, onConfirm }, ref) => {
    const snapPoints = useMemo(() => [300], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
        />
      ),
      []
    );

    const handleConfirm = () => {
      if (typeof ref === "object" && ref?.current) {
        ref.current.dismiss();
      }
      onConfirm();
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: COLORS.darkGrey }}
        handleIndicatorStyle={{ backgroundColor: COLORS.lightGrey }}
      >
        <BottomSheetView>
          <VStack spacing="md" className="p-5">
            {/* Your content here */}
          </VStack>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

MyNewBottomSheet.displayName = "MyNewBottomSheet";

export default MyNewBottomSheet;
```

### **Step 2: Update Zustand Store**

**File:** `hooks/bottom-sheets/useBottomsheetStore.ts`

```tsx
import { create } from "zustand";
import type { RefObject } from "react";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

interface BottomsheetState {
  // Add ref setter
  setMyNewRef: (ref: RefObject<BottomSheetModal | null>) => void;

  // Add imperative method
  openMyNewSheet: () => void;

  // Add internal ref storage
  _myNewRef: RefObject<BottomSheetModal | null> | null;
}

export const useBottomsheetStore = create<BottomsheetState>((set, get) => ({
  // Initialize ref
  _myNewRef: null,

  // Setter
  setMyNewRef: (ref) => set({ _myNewRef: ref }),

  // Open method
  openMyNewSheet: () => {
    const ref = get()._myNewRef;
    ref?.current?.present();
  },
}));
```

### **Step 3: Register in BottomSheetsManager**

**File:** `components/bottom-sheets/BottomSheetsManager/BottomSheetsManager.tsx`

```tsx
import MyNewBottomSheet from "../MyNewBottomSheet/MyNewBottomSheet";

const BottomSheetsManager = () => {
  const { setMyNewRef } = useBottomsheetStore();

  // Create ref
  const myNewRef = useRef<BottomSheetModal>(null);

  // Register ref
  useEffect(() => {
    setMyNewRef(myNewRef);
  }, [setMyNewRef]);

  return (
    <>
      {/* ...existing sheets */}
      <MyNewBottomSheet ref={myNewRef} {...props} />
    </>
  );
};
```

### **Step 4: Write Tests**

```tsx
// MyNewBottomSheet.test.tsx
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { render } from "@testing-library/react-native";
import React, { createRef } from "react";

import MyNewBottomSheet from "./MyNewBottomSheet";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
);

describe("MyNewBottomSheet", () => {
  it("should render without crashing", () => {
    const ref = createRef<BottomSheetModal>();
    const { toJSON } = render(
      <TestWrapper>
        <MyNewBottomSheet ref={ref} onConfirm={jest.fn()} />
      </TestWrapper>
    );
    expect(toJSON()).toBeTruthy();
  });
});
```

### **Step 5: Export Component**

**File:** `components/index.ts`

```tsx
export { default as MyNewBottomSheet } from "./bottom-sheets/MyNewBottomSheet/MyNewBottomSheet";
```

---

## 🔧 Advanced: Bottom Sheets with Dynamic Data

### **Pattern: Store Data in Zustand**

For bottom sheets that need data:

**1. Add State to Store:**

```tsx
interface BottomsheetState {
  mySheetData: { id: string; name: string } | null;
  setMySheetData: (data: { id: string; name: string } | null) => void;
  openMySheetWithData: (data: { id: string; name: string }) => void;
}

export const useBottomsheetStore = create<BottomsheetState>((set, get) => ({
  mySheetData: null,
  setMySheetData: (data) => set({ mySheetData: data }),

  openMySheetWithData: (data) => {
    set({ mySheetData: data });
    // present() called by useEffect in BottomSheetsManager
  },
}));
```

**2. Trigger in BottomSheetsManager:**

```tsx
const { mySheetData } = useBottomsheetStore();

useEffect(() => {
  if (mySheetData && mySheetRef.current) {
    mySheetRef.current.present();
  }
}, [mySheetData]);

return (
  <MyNewBottomSheet
    ref={mySheetRef}
    id={mySheetData?.id || ""}
    name={mySheetData?.name || ""}
  />
);
```

---

## 📐 Design Specifications

### **Standard Bottom Sheet Styling**

```tsx
<BottomSheetModal
  snapPoints={[height]} // Typical: [280], [490], or ["80%"]
  enablePanDownToClose
  backgroundStyle={{
    backgroundColor: COLORS.darkGrey,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }}
  handleIndicatorStyle={{
    backgroundColor: COLORS.lightGrey,
    height: 2,
  }}
/>
```

### **Common Snap Point Heights**

- **Small** — 280px (Yes/No confirmations)
- **Medium** — 490px (Options menus)
- **Large** — 80% (Scrollable lists, forms)

---

## 🧪 Testing Guidelines

### **Required Tests**

1. **Component renders without crashing**
2. **Accepts all required props**
3. **Forwards ref correctly**
4. **Has displayName set**

### **Component-Specific Tests**

- User interactions (button presses)
- Navigation flows
- Data display
- Edge cases (long text, missing data)

---

## 🚨 Troubleshooting

### **Bottom Sheet Doesn't Open**

**Issue**: Calling `openMySheet()` does nothing

**Solutions:**

1. **Check ref is registered** in BottomSheetsManager
2. **Verify component is mounted** (not conditionally rendered)
3. **Check BottomSheetModalProvider** wraps the app

### **Bottom Sheet Appears Behind Tab Bar**

**Solution**: Ensure `BottomSheetsManager` is inside `BottomSheetModalProvider`

---

## 📚 Related Documentation

- [Component Building Guide](../../../docs/component-building-guide.md) - Component structure patterns
- [Testing Strategy](../../../docs/testing-strategy.md) - Testing best practices

---

_This documentation is maintained by the development team._
