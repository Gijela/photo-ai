import { Switch } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface ToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  sideBySide: boolean;
  setSideBySide: (sideBySide: boolean) => void;
}

export default function Toggle({
  sideBySide,
  setSideBySide,
  ...props
}: ToggleProps) {
  return (
    <Switch.Group as="div" {...props}>
      <div className="flex items-center">
        <Switch
          checked={sideBySide}
          onChange={setSideBySide}
          className={classNames(
            sideBySide ? "bg-blue-600" : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none "
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              sideBySide ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3">
          <span
            className={`text-sm font-medium ${
              sideBySide ? "" : "text-gray-500"
            } `}
          >
            对比查看
          </span>
        </Switch.Label>
      </div>
    </Switch.Group>
  );
}
