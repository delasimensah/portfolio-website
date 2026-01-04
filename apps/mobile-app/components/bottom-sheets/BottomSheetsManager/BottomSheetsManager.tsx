import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";

import { useBottomsheetStore } from "@/hooks";

import GenericBottomSheet from "../GenericBottomSheet/GenericBottomSheet";

/**
 * BottomSheetsManager Component
 *
 * Centralized manager for all bottom sheets in the app.
 * Renders all bottom sheet components and registers their refs with the store.
 *
 * Place this component in your root layout (e.g., app/(main-app)/_layout.tsx)
 *
 * @example
 * ```tsx
 * // In app/(main-app)/_layout.tsx
 * import BottomSheetsManager from "@/components/bottom-sheets/BottomSheetsManager/BottomSheetsManager";
 *
 * export default function Layout() {
 *   return (
 *     <>
 *       Your app content
 *       <BottomSheetsManager />
 *     </>
 *   );
 * }
 * ```
 */
const BottomSheetsManager: React.FC = () => {
  const { setGenericRef } = useBottomsheetStore();

  // Create refs locally in this component
  const genericRef = useRef<BottomSheetModal>(null);

  // Register refs with the store on mount
  useEffect(() => {
    setGenericRef(genericRef);
  }, [setGenericRef]);

  return (
    <>
      <GenericBottomSheet ref={genericRef} title="Example Sheet">
        {/* Add your bottom sheet content here */}
      </GenericBottomSheet>
    </>
  );
};

export default BottomSheetsManager;
