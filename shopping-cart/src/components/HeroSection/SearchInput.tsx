import type { ChangeEvent, FC } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

/**
 * @interface SearchInputProps
 * @property {string} value - The current value of the search input.
 * @property {function} onChange - Callback function to handle changes in the search input.
 * @property {string} [placeholder] - Optional placeholder text for the input.
 */
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * @component SearchInput
 * @description
 * A React component that renders a stylized search input with animated effects that are visually appealing to the user.
 * @param {SearchInputProps} props - The properties for the SearchInput component.
 */
const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search products...",
}) => {
  // to clear input
  const handleClear = () => onChange("");

  // change handler
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto group">
      {/*glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-lg opacity-0 group-focus-within:opacity-20 group-hover:opacity-10 blur-lg transition-all duration-700" />

      {/* Animated background */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/40 via-orange-50/40 to-amber-100/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-amber-200/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 group-focus-within:animate-pulse transition-opacity duration-500" />
      </div>

      <div className="relative bg-white/95 backdrop-blur-2xl border-2 border-amber-100/60 rounded-lg shadow-lg hover:shadow-xl group-focus-within:shadow-2xl group-focus-within:border-amber-300/80 transition-all duration-500">
        {/* Search icon */}
        <div className="absolute left-4 sm:left-5 lg:left-6 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 group-focus-within:text-orange-500 transition-all duration-300 group-focus-within:scale-110" />
            <div className="absolute inset-0 bg-amber-400/30 rounded-full scale-150 opacity-0 group-focus-within:opacity-100 group-focus-within:animate-ping transition-opacity duration-500" />
          </div>
        </div>

        {/* input  */}
        <input
          type="search"
          aria-label="Search products"
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
          className="
            w-full
            pl-12 sm:pl-14 lg:pl-16
            pr-12 sm:pr-14 lg:pr-16
            py-4 sm:py-5 lg:py-6
            bg-transparent
            border-none
            text-gray-800
            text-sm sm:text-base lg:text-lg
            font-mono
            placeholder-gray-400
            focus:outline-none
            focus:placeholder-gray-300
            transition-all duration-300
            relative z-10
          "
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 sm:right-5 lg:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 z-10 group/clear shadow-sm hover:shadow-md"
            aria-label="Clear search"
          >
            <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover/clear:text-gray-800 transition-colors duration-200" />
          </button>
        )}

        {/*indicator */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-b-lg transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/*particles */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <div className="absolute top-2 left-8 w-1 h-1 bg-amber-400/60 rounded-full opacity-0 group-focus-within:opacity-100 group-focus-within:animate-bounce transition-opacity duration-500 delay-100" />
        <div className="absolute top-4 right-12 w-1.5 h-1.5 bg-orange-400/60 rounded-full opacity-0 group-focus-within:opacity-100 group-focus-within:animate-bounce transition-opacity duration-500 delay-300" />
        <div className="absolute bottom-3 left-16 w-0.5 h-0.5 bg-amber-300/60 rounded-full opacity-0 group-focus-within:opacity-100 group-focus-within:animate-bounce transition-opacity duration-500 delay-500" />
        <div className="absolute bottom-5 right-8 w-1 h-1 bg-orange-300/60 rounded-full opacity-0 group-focus-within:opacity-100 group-focus-within:animate-bounce transition-opacity duration-500 delay-200" />
      </div>

      {/* text to help users */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-focus-within:opacity-100 transition-all duration-500 delay-200">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 backdrop-blur-sm border border-amber-200/50 rounded-xl px-4 py-2 shadow-lg">
          <p className="text-xs font-medium text-amber-700 whitespace-nowrap flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Start typing to search products
          </p>
        </div>
      </div>

      {/*corner elements */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-amber-300/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-orange-300/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-amber-300/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-orange-300/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300" />
    </div>
  );
};

export default SearchInput;
