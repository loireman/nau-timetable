import * as jsxRuntime from "react/jsx-runtime";
import { forwardRef, useRef, useEffect, createContext, useState, useContext, Fragment as Fragment$1 } from "react";
import { Icon } from "@iconify/react";
import { Link, useForm, Head, usePage, createInertiaApp } from "@inertiajs/react";
import { Transition, Dialog } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { toast } from "react-toastify";
import axios from "axios";
import ReactQuill from "react-quill";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx("p", { ...props, className: "form-required " + className, children: message }) : null;
}
function InputLabel({ value, className = "", required = false, children, ...props }) {
  return /* @__PURE__ */ jsxs("label", { ...props, className: `form-label ` + className, children: [
    required && /* @__PURE__ */ jsx("span", { className: "form-required", children: "* " }),
    value ? value : children
  ] });
}
function PrimaryButton({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `button-primary ` + className,
      disabled,
      children
    }
  );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const input = ref ? ref : useRef();
  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: `form-input ` + className,
      ref: input
    }
  );
});
function ApplicationLogo({ text = null, ...props }) {
  return /* @__PURE__ */ jsxs("div", { ...props, className: "logo", children: [
    /* @__PURE__ */ jsx("svg", { viewBox: "0 0 28 29", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M13.1726 11.8088C13.6856 12.1639 13.7518 12.8969 13.3107 13.3381L6.92196 19.728C6.63568 20.0144 6.20499 20.0998 5.83108 19.9444L3.94178 19.1594C3.8755 19.1319 3.79915 19.1473 3.7487 19.1983C3.6708 19.2771 3.68409 19.4074 3.7763 19.4689L6.7627 21.4603C6.87241 21.5334 6.96657 21.6276 7.03975 21.7373L9.03187 24.7229C9.09353 24.8153 9.22431 24.8283 9.30287 24.7497C9.35326 24.6993 9.36832 24.6235 9.341 24.5577L8.55655 22.6673C8.40142 22.2935 8.48692 21.863 8.77314 21.5769L15.1619 15.1892C15.6031 14.7481 16.3361 14.8143 16.6912 15.3272L21.913 22.8704C21.9926 22.9853 22.1567 23.0005 22.256 22.9021C22.3189 22.8398 22.3394 22.7464 22.3083 22.6635L18.5458 12.6335C18.408 12.2662 18.4977 11.8523 18.7751 11.575L24.4766 5.87609C24.5982 5.75453 24.6946 5.61022 24.7604 5.45139C24.8262 5.29257 24.8601 5.12234 24.8601 4.95043C24.8601 4.77851 24.8262 4.60829 24.7604 4.44946C24.6946 4.29064 24.5982 4.14632 24.4766 4.02476C24.3551 3.9032 24.2108 3.80678 24.0519 3.74099C23.8931 3.6752 23.7229 3.64134 23.551 3.64134C23.3791 3.64134 23.2088 3.6752 23.05 3.74099C22.8912 3.80678 22.7469 3.9032 22.6253 4.02476L16.9236 9.72521C16.6462 10.0025 16.2325 10.092 15.8653 9.95433L5.83691 6.1927C5.75451 6.16179 5.66166 6.18178 5.59929 6.24386C5.49967 6.343 5.51438 6.50819 5.62994 6.58818L13.1726 11.8088ZM22.5475 26.3129C22.1064 26.754 21.3734 26.688 21.0183 26.1751L16.3233 19.395C15.9681 18.8821 15.2352 18.816 14.794 19.2572L11.8602 22.191C11.5739 22.4772 11.4885 22.9079 11.6439 23.2818L12.2177 24.6629C12.3731 25.0368 12.2876 25.4675 12.0013 25.7538L9.60631 28.1478C9.16008 28.5939 8.41734 28.5203 8.06732 27.9954L5.15348 23.6251C5.08027 23.5153 4.98605 23.4211 4.87625 23.3479L0.504731 20.4328C-0.0202516 20.0827 -0.0937642 19.3399 0.352419 18.8937L2.74773 16.4984C3.03395 16.2122 3.46447 16.1268 3.8383 16.282L5.21834 16.855C5.59217 17.0102 6.02269 16.9247 6.30891 16.6385L9.24264 13.7048C9.68384 13.2636 9.6177 12.5305 9.10466 12.1754L2.32545 7.48319C1.81235 7.12805 1.74626 6.39486 2.1876 5.9537L4.5873 3.5549C4.86458 3.27773 5.27824 3.18815 5.64534 3.32578L15.2076 6.91087C15.5748 7.04852 15.9885 6.95889 16.2658 6.68162L20.774 2.17343C21.137 1.80166 21.5701 1.50564 22.0484 1.3025C22.5266 1.09937 23.0404 0.993176 23.56 0.990072C24.0796 0.986968 24.5946 1.08702 25.0752 1.28442C25.5559 1.48182 25.9925 1.77266 26.3599 2.14006C26.7273 2.50747 27.0182 2.94414 27.2156 3.42477C27.413 3.9054 27.513 4.42043 27.5099 4.94001C27.5068 5.45959 27.4006 5.97339 27.1975 6.45163C26.9944 6.92986 26.6983 7.36303 26.3266 7.72602L21.8184 12.2342C21.5411 12.5115 21.4515 12.9252 21.5892 13.2924L25.1755 22.8559C25.3132 23.2231 25.2236 23.6368 24.9463 23.9141L22.5475 26.3129Z" }) }),
    text && /* @__PURE__ */ jsx("span", { children: "Loiri admin" })
  ] });
}
function VerticalNavLink({ active = false, className = "", title = "", icon = "", children, ...props }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      ...props,
      className: "vertical-link transition duration-600 ease-in-out focus:outline-none " + (active ? "active" : "") + className,
      children: [
        icon && /* @__PURE__ */ jsx(Icon, { icon }),
        title && /* @__PURE__ */ jsx("span", { children: title }),
        children
      ]
    }
  );
}
const DropDownContext = createContext();
const Dropdown = ({ children, className }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };
  return /* @__PURE__ */ jsx(DropDownContext.Provider, { value: { open, setOpen, toggleOpen }, children: /* @__PURE__ */ jsx("div", { className: `relative + ${className}`, children }) });
};
const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onClick: toggleOpen, children }),
    open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40", onClick: () => setOpen(false) })
  ] });
};
const Content = ({ align = "right", width = "48", contentClasses = "py-1 bg-white dark:bg-gray-700", children }) => {
  const { open, setOpen } = useContext(DropDownContext);
  let alignmentClasses = "origin-top";
  if (align === "left") {
    alignmentClasses = "origin-top-left left-0";
  } else if (align === "right") {
    alignmentClasses = "origin-top-right right-0";
  }
  let widthClasses = "";
  if (width === "48") {
    widthClasses = "w-48";
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Transition,
    {
      as: Fragment$1,
      show: open,
      enter: "transition ease-out duration-200",
      enterFrom: "transform opacity-0 scale-95",
      enterTo: "transform opacity-100 scale-100",
      leave: "transition ease-in duration-75",
      leaveFrom: "transform opacity-100 scale-100",
      leaveTo: "transform opacity-0 scale-95",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`,
          onClick: () => setOpen(false),
          children: /* @__PURE__ */ jsx("div", { className: `rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses, children })
        }
      )
    }
  ) });
};
const DropdownLink = ({ className = "", children, ...props }) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out " + className,
      children
    }
  );
};
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
const SearchInput = forwardRef(function SearchInput2({ type = "search", className = "", isFocused = false, ...props }, ref) {
  const input = ref ? ref : useRef();
  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `form-search ${className}`, children: [
    /* @__PURE__ */ jsx("button", { children: /* @__PURE__ */ jsx(Icon, { icon: "mdi:search" }) }),
    /* @__PURE__ */ jsx("div", { className: "vr" }),
    /* @__PURE__ */ jsx("input", { ...props, type, ref: input })
  ] });
});
function Modal({ children, show = false, maxWidth = "2xl", closeable = true, onClose = () => {
} }) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, as: Fragment$1, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment$1,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment$1,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              Dialog.Panel,
              {
                className: `mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function Authenticated$1({
  header,
  searchField = false,
  addElement = false,
  sortOptions = [],
  children,
  filterOptions = []
}) {
  const [search, setSearch] = useState("");
  const [selectedFilterState, setSelectedFilterState] = useState([]);
  const [formFilterState, setFormFilterState] = useState([]);
  useEffect(() => {
    const updateFilters = () => {
      const url = new URL(window.location);
      const searchParams = url.searchParams;
      const activeFilters = filterOptions.filter((filter) => searchParams.get(filter.key) === "on").map((filter) => filter.key);
      setSelectedFilterState(activeFilters);
      setFormFilterState(activeFilters);
    };
    if (filterOptions.length > 0) {
      updateFilters();
    }
  }, [filterOptions]);
  const handleSearch = (e) => {
    e.preventDefault();
    const url = new URL(window.location);
    url.searchParams.set("search", search);
    window.location = url;
  };
  const handleSort = (sort) => {
    const url = new URL(window.location);
    url.searchParams.set("sort", sort);
    window.location = url;
  };
  const [openOptions, setOpenOptions] = useState(false);
  const openOptionsModal = (id) => {
    setOpenOptions(true);
  };
  const closeModal = () => {
    setOpenOptions(false);
  };
  const handleFilterToggle = (filter) => {
    if (formFilterState.includes(filter.key)) {
      setFormFilterState(
        formFilterState.filter((item) => item !== filter.key)
      );
    } else {
      setFormFilterState([...formFilterState, filter.key]);
    }
  };
  const handleFilterRemove = (filterKey) => {
    setSelectedFilterState(
      (prevSelectedFilters) => prevSelectedFilters.filter((item) => item !== filterKey)
    );
    const url = new URL(window.location);
    url.searchParams.delete(filterKey);
    window.location = url.toString();
  };
  const handleApplyFilters = () => {
    const url = new URL(window.location);
    filterOptions.forEach((filter) => {
      if (!formFilterState.includes(filter.key)) {
        url.searchParams.delete(filter.key);
      }
    });
    formFilterState.forEach((filterKey) => {
      url.searchParams.set(filterKey, "on");
    });
    window.location = url;
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "sidebar", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "grid justify-center w-full p-4 lg:p-6",
          href: route("admin"),
          children: /* @__PURE__ */ jsx(ApplicationLogo, { text: true })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "w-full py-2 px-1 lg:px-4 overflow-y-scroll", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center w-full", children: [
          /* @__PURE__ */ jsx("span", { className: "py-4 px-1 text-sm lg:text-2xl w-full text-start", children: "Main" }),
          /* @__PURE__ */ jsx(
            VerticalNavLink,
            {
              href: route("admin"),
              active: route().current("admin"),
              icon: "mdi:home-analytics",
              title: "Dashboard"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center w-full", children: [
          /* @__PURE__ */ jsx("span", { className: "py-4 px-1 text-sm lg:text-2xl w-full text-start", children: "Timetable" }),
          /* @__PURE__ */ jsx(
            VerticalNavLink,
            {
              href: route("department.index"),
              active: route().current(
                "department.(index|create|edit)"
              ),
              icon: "mdi:office-building-cog",
              title: "Departments"
            }
          ),
          /* @__PURE__ */ jsx(
            VerticalNavLink,
            {
              href: route("stream.index"),
              active: route().current(
                "stream.(index|create|edit)"
              ),
              icon: "mdi:account-group",
              title: "Streams"
            }
          ),
          /* @__PURE__ */ jsx(
            VerticalNavLink,
            {
              href: route("group.index"),
              active: route().current(
                "group.(index|create|edit)"
              ),
              icon: "mdi:account-group-outline",
              title: "Groups"
            }
          ),
          /* @__PURE__ */ jsx(
            VerticalNavLink,
            {
              href: route("timetable.index"),
              active: route().current(
                "timetable.(index|create|edit)"
              ),
              icon: "mdi:timetable",
              title: "Timetables"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center w-full", children: [
          /* @__PURE__ */ jsx("span", { className: "py-4 px-1 text-sm lg:text-2xl w-full text-start", children: "User edit" }),
          /* @__PURE__ */ jsx(
            VerticalNavLink,
            {
              href: route("user.index"),
              active: route().current("user.(index|create|edit)"),
              icon: "mdi:account-multiple",
              title: "Users"
            }
          ),
          /* @__PURE__ */ jsx(
            VerticalNavLink,
            {
              href: route("role.index"),
              active: route().current("role.(index|create|edit)"),
              icon: "mdi:account-cog",
              title: "Roles"
            }
          ),
          /* @__PURE__ */ jsx(
            VerticalNavLink,
            {
              href: route("permission.index"),
              active: route().current(
                "permission.(index|create|edit)"
              ),
              icon: "mdi:lock",
              title: "Permissions"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center w-full", children: [
          /* @__PURE__ */ jsx("span", { className: "py-4 px-1 text-sm lg:text-2xl w-full text-start", children: "Server" }),
          /* @__PURE__ */ jsx(
            VerticalNavLink,
            {
              href: route("config.index"),
              active: route().current(
                "config.(index|create|edit)"
              ),
              icon: "mdi:settings",
              title: "Configs"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        VerticalNavLink,
        {
          className: "mt-4",
          href: route("dashboard"),
          icon: "mdi:exit-to-app",
          title: "To the main"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full pl-20 lg:pl-[10rem]", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-header max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8", children: [
        header && /* @__PURE__ */ jsx("header", { children: header }),
        searchField && /* @__PURE__ */ jsx("form", { onSubmit: handleSearch, children: /* @__PURE__ */ jsx(
          SearchInput,
          {
            className: "w-full",
            value: search,
            onChange: (event) => setSearch(event.target.value)
          }
        ) }),
        filterOptions.length !== 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "options-block", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `chip filter active`,
                onClick: () => openOptionsModal(),
                children: "Filters"
              }
            ),
            selectedFilterState.length !== 0 && /* @__PURE__ */ jsx(Fragment, { children: selectedFilterState.map(
              (filterKey, key) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "chip filter",
                  children: [
                    filterKey,
                    /* @__PURE__ */ jsx(
                      Icon,
                      {
                        icon: "mdi:close",
                        onClick: () => handleFilterRemove(
                          filterKey
                        )
                      }
                    )
                  ]
                },
                key
              )
            ) })
          ] }),
          /* @__PURE__ */ jsx(Modal, { show: openOptions, onClose: closeModal, children: /* @__PURE__ */ jsxs("div", { className: "card-modal", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "fixed right-4",
                onClick: closeModal,
                children: /* @__PURE__ */ jsx(Icon, { icon: "mdi:close" })
              }
            ),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h5", { className: "form-text", children: "Filters" }) }),
            /* @__PURE__ */ jsx("div", { children: filterOptions.map((element, key) => /* @__PURE__ */ jsxs(
              "label",
              {
                className: "flex items-center",
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      name: element.key,
                      checked: formFilterState.includes(
                        element.key
                      ),
                      onChange: () => handleFilterToggle(
                        element
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm", children: [
                    element.key,
                    element.value !== null && ` (${element.value})`
                  ] })
                ]
              },
              key
            )) }),
            /* @__PURE__ */ jsx(
              PrimaryButton,
              {
                className: "mt-6 w-full grid",
                onClick: handleApplyFilters,
                children: /* @__PURE__ */ jsx("span", { children: "Filter" })
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          sortOptions.length != 0 && /* @__PURE__ */ jsxs(Dropdown, { className: "w-fit", children: [
            /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsxs("span", { className: "flex w-fit gap-2 items-center lg:text-2xl", children: [
              "Sort",
              /* @__PURE__ */ jsx(
                Icon,
                {
                  icon: "mdi:sort",
                  className: "md:w-6 md:h-6"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(Dropdown.Content, { align: "left", children: sortOptions.map((option, key) => /* @__PURE__ */ jsx(
              Dropdown.Link,
              {
                onClick: () => handleSort(option.key),
                children: option.label
              },
              key
            )) })
          ] }),
          addElement && /* @__PURE__ */ jsxs(
            "a",
            {
              href: route(route().current()) + "/create",
              className: "admin-create",
              children: [
                /* @__PURE__ */ jsx(
                  Icon,
                  {
                    icon: "mdi:plus",
                    className: "md:w-6 md:h-6"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-medium md:text-2xl", children: "Create" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("main", { children })
    ] })
  ] });
}
function Create$7({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    value: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("config.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Config create" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Config create" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Config name" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => {
                const newValue = e.target.value.replace(/ /g, "_").toLowerCase();
                setData("name", newValue);
              },
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              className: "mt-4",
              htmlFor: "value",
              value: "Config value"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "value",
              name: "value",
              type: "text",
              className: "mt-1 block w-full",
              value: data.value,
              onChange: (e) => setData("value", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.value, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { className: "text-[1rem]", children: "Create" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$7
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "form-checkbox " + className
    }
  );
}
function Edit$8({ auth, config }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: "PUT",
    name: config.name,
    value: config.value
  });
  const submit = (e) => {
    e.preventDefault();
    Inertia.put(route("config.update", { config }), data);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "config edit" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "config edit" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Назва" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => {
                const newValue = e.target.value.replace(/ /g, "_").toLowerCase();
                setData("name", newValue);
              },
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              className: "mt-4",
              htmlFor: "value",
              value: "Config value"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "value",
              name: "value",
              type: "text",
              className: "mt-1 block w-full",
              value: data.value,
              onChange: (e) => setData("value", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.value, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { children: "Update" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$8
}, Symbol.toStringTag, { value: "Module" }));
function Pagination({
  nameContent = "елементи",
  pageContent,
  ...props
}) {
  return /* @__PURE__ */ jsxs("div", { className: "pagination", children: [
    /* @__PURE__ */ jsx("div", { className: "content", children: Object.entries(pageContent.links).map(([key, element]) => /* @__PURE__ */ jsx(
      "a",
      {
        className: `${element.active ? "active" : ""} ${element.label === "&laquo; Previous" || element.label === "Next &raquo;" ? "first-page" : ""}`,
        href: element.url,
        children: element.label == "&laquo; Previous" && /* @__PURE__ */ jsx(Icon, { icon: "mdi:chevron-left" }) || element.label == "Next &raquo;" && /* @__PURE__ */ jsx(Icon, { icon: "mdi:chevron-right" }) || element.label
      },
      key
    )) }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Виводяться ",
      nameContent,
      " ",
      pageContent.from,
      " - ",
      pageContent.to
    ] })
  ] });
}
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
function DateFormatted({ inputDate, className }) {
  const formattedDate = formatDate(inputDate);
  return /* @__PURE__ */ jsx(Fragment, { children: formattedDate });
}
function Index$7({ auth, configs, can: can2, message, error }) {
  var _a, _b, _c;
  function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      ).content;
      fetch(route("config.destroy", id), {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken
        }
      }).then(() => {
        window.location.reload();
      });
    }
  }
  const [openOptions, setOpenOptions] = useState(false);
  const [elementId, setElementId] = useState(null);
  const openOptionsModal = (id) => {
    setOpenOptions(true);
    setElementId(id);
  };
  const closeModal = () => {
    setOpenOptions(false);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Configs" }),
      addElement: can2.create,
      searchField: true,
      sortOptions: [
        { key: "id", label: "Id (Ascending)" },
        { key: "-id", label: "Id (Descending)" },
        { key: "name", label: "Name (A to Z)" },
        { key: "-name", label: "Name (Z to A)" }
      ],
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Configs" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "admin-list", children: configs.data.map((element, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "card-default",
              onClick: () => openOptionsModal(index),
              children: [
                /* @__PURE__ */ jsx("h5", { className: "form-text", children: element.name }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Updated at",
                  " ",
                  /* @__PURE__ */ jsx(
                    DateFormatted,
                    {
                      inputDate: element.updated_at
                    }
                  )
                ] })
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsx(Modal, { show: openOptions, onClose: closeModal, children: configs.data[elementId] && /* @__PURE__ */ jsxs("div", { className: "card-modal", children: [
            /* @__PURE__ */ jsx("button", { className: "fixed right-4", onClick: closeModal, children: /* @__PURE__ */ jsx(Icon, { icon: "mdi:close" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Name" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_a = configs.data[elementId]) == null ? void 0 : _a.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1 m-auto", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Created at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_b = configs.data[elementId]) == null ? void 0 : _b.created_at
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Updated at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_c = configs.data[elementId]) == null ? void 0 : _c.updated_at
                  }
                )
              ] })
            ] }),
            can2.edit && /* @__PURE__ */ jsxs(
              "a",
              {
                className: "admin-edit",
                href: route(
                  "config.edit",
                  configs.data[elementId].id
                ),
                children: [
                  "Edit ",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:pencil" })
                ]
              }
            ),
            can2.delete && /* @__PURE__ */ jsxs(
              "button",
              {
                className: "admin-delete",
                onClick: () => destroy(configs.data[elementId].id),
                children: [
                  "Delete",
                  /* @__PURE__ */ jsx(
                    Icon,
                    {
                      icon: "mdi:trash"
                    }
                  )
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { pageContent: configs })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$7
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard$3({ auth }) {
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "p-6", children: "You're logged in admin!" }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard$3
}, Symbol.toStringTag, { value: "Module" }));
function Create$6({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    short: "",
    chief: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("department.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Department create" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Department create" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Department name" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              className: "mt-3",
              htmlFor: "short",
              value: "Department short"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "short",
              name: "short",
              value: data.short,
              className: "mt-1 block w-full",
              autoComplete: "short",
              isFocused: true,
              onChange: (e) => setData("short", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.short, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              className: "mt-3",
              htmlFor: "chief",
              value: "Department chief"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "chief",
              name: "chief",
              value: data.chief,
              className: "mt-1 block w-full",
              autoComplete: "chief",
              isFocused: true,
              onChange: (e) => setData("chief", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.chief, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { className: "text-[1rem]", children: "Create" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$6
}, Symbol.toStringTag, { value: "Module" }));
function Edit$7({ auth, department }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: "PUT",
    name: department.name,
    short: department.short,
    chief: department.chief
  });
  const submit = (e) => {
    e.preventDefault();
    Inertia.put(
      route("department.update", { department }),
      data
    );
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Department edit" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Department edit" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Department name" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              className: "mt-3",
              htmlFor: "short",
              value: "Department short"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "short",
              name: "short",
              value: data.short,
              className: "mt-1 block w-full",
              autoComplete: "chief",
              isFocused: true,
              onChange: (e) => setData("short", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.short, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              className: "mt-3",
              htmlFor: "chief",
              value: "Department chief"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "chief",
              name: "chief",
              value: data.chief,
              className: "mt-1 block w-full",
              autoComplete: "chief",
              isFocused: true,
              onChange: (e) => setData("chief", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.chief, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { children: "Update" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$7
}, Symbol.toStringTag, { value: "Module" }));
function Index$6({ auth, departments, can: can2, message, error }) {
  var _a, _b, _c, _d, _e;
  function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      ).content;
      fetch(route("department.destroy", id), {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken
        }
      }).then(() => {
        window.location.reload();
      });
    }
  }
  const [openOptions, setOpenOptions] = useState(false);
  const [elementId, setElementId] = useState(null);
  const openOptionsModal = (id) => {
    setOpenOptions(true);
    setElementId(id);
  };
  const closeModal = () => {
    setOpenOptions(false);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Departments" }),
      addElement: can2.create,
      searchField: true,
      sortOptions: [
        { key: "id", label: "Id (Ascending)" },
        { key: "-id", label: "Id (Descending)" },
        { key: "name", label: "Name (A to Z)" },
        { key: "-name", label: "Name (Z to A)" }
      ],
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Departments" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "admin-list", children: departments.data.map((element, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "card-default",
              onClick: () => openOptionsModal(index),
              children: [
                /* @__PURE__ */ jsx("h5", { className: "form-text", children: element.name }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Updated at",
                  " ",
                  /* @__PURE__ */ jsx(
                    DateFormatted,
                    {
                      inputDate: element.updated_at
                    }
                  )
                ] })
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsx(Modal, { show: openOptions, onClose: closeModal, children: departments.data[elementId] && /* @__PURE__ */ jsxs("div", { className: "card-modal", children: [
            /* @__PURE__ */ jsx("button", { className: "fixed right-4", onClick: closeModal, children: /* @__PURE__ */ jsx(Icon, { icon: "mdi:close" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Short" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_a = departments.data[elementId]) == null ? void 0 : _a.short })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Name" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_b = departments.data[elementId]) == null ? void 0 : _b.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Chief" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_c = departments.data[elementId]) == null ? void 0 : _c.chief })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1 m-auto", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Created at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_d = departments.data[elementId]) == null ? void 0 : _d.created_at
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Updated at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_e = departments.data[elementId]) == null ? void 0 : _e.updated_at
                  }
                )
              ] })
            ] }),
            can2.edit && /* @__PURE__ */ jsxs(
              "a",
              {
                className: "admin-edit",
                href: route(
                  "department.edit",
                  departments.data[elementId].id
                ),
                children: [
                  "Edit ",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:pencil" })
                ]
              }
            ),
            can2.delete && /* @__PURE__ */ jsxs(
              "button",
              {
                className: "admin-delete",
                onClick: () => destroy(departments.data[elementId].id),
                children: [
                  "Delete",
                  /* @__PURE__ */ jsx(
                    Icon,
                    {
                      icon: "mdi:trash"
                    }
                  )
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { pageContent: departments })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$6
}, Symbol.toStringTag, { value: "Module" }));
function InputSwitch({ label, onChange, initialValue }) {
  const [isChecked, setIsChecked] = useState(initialValue);
  useEffect(() => {
    setIsChecked(initialValue);
  }, [initialValue]);
  const toggleSwitch = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };
  return /* @__PURE__ */ jsxs("div", { className: "form-switch", children: [
    /* @__PURE__ */ jsxs("div", { className: `switch-container ${isChecked ? "on" : ""}`, onClick: toggleSwitch, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: isChecked,
          onChange: toggleSwitch,
          className: "hidden-checkbox"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "switch" })
    ] }),
    label && /* @__PURE__ */ jsx("span", { children: label })
  ] });
}
const Select = ({ options, defaultValue, defaultSelectable, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  const handleOptionSelect = (selectedValue) => {
    setIsOpen(false);
    onChange(selectedValue);
  };
  const canSelectDefault = defaultSelectable || value === defaultValue;
  return /* @__PURE__ */ jsxs("div", { className: `form-input form-select ${isOpen ? "open" : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: `selected-option ${disabled ? "disabled" : ""}`, onClick: handleToggle, children: options[value] || defaultValue }),
    isOpen && !disabled && /* @__PURE__ */ jsxs("ul", { className: "options", children: [
      canSelectDefault && /* @__PURE__ */ jsx("li", { className: `option ${defaultValue === value ? "selected" : ""}`, onClick: () => handleOptionSelect(defaultValue), children: defaultValue }),
      Object.keys(options).map((optionId, index) => /* @__PURE__ */ jsx(
        "li",
        {
          className: `option ${optionId === value ? "selected" : ""}`,
          onClick: () => handleOptionSelect(optionId),
          children: options[optionId]
        },
        index
      ))
    ] })
  ] });
};
function Create$5({ auth, streams, substreams }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    stream_id: null,
    substream_id: null
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("group.store"));
  };
  const handleStreamChange = (newValue) => {
    setData("stream_id", newValue);
  };
  const handleSubStreamChange = (newValue) => {
    setData("substream_id", newValue);
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const changeGroupType = (newValue) => {
    if (newValue == true) {
      setData("stream_id", null);
    } else {
      setData("substream_id", null);
    }
    setIsEnabled(newValue);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Group create" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Group create" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Is group" }),
          /* @__PURE__ */ jsx(
            InputSwitch,
            {
              initialValue: isEnabled,
              onChange: changeGroupType
            }
          ),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Group name" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          isEnabled ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                className: "mt-3",
                htmlFor: "substream_id",
                value: "Sub Stream",
                disabled: !isEnabled
              }
            ),
            /* @__PURE__ */ jsx(
              Select,
              {
                options: substreams,
                defaultValue: "Виберіть поток групи",
                defaultSelectable: false,
                disabled: !isEnabled,
                value: data.substream_id,
                onChange: handleSubStreamChange
              }
            )
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                className: "mt-3",
                htmlFor: "stream_id",
                value: "Stream",
                disabled: isEnabled
              }
            ),
            /* @__PURE__ */ jsx(
              Select,
              {
                options: streams,
                defaultValue: "Виберіть поток",
                defaultSelectable: false,
                disabled: isEnabled,
                value: data.stream_id,
                onChange: handleStreamChange
              }
            )
          ] }),
          /* @__PURE__ */ jsx(InputError, { message: errors.stream_id, className: "mt-2" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.substream_id, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { className: "text-[1rem]", children: "Create" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$5
}, Symbol.toStringTag, { value: "Module" }));
function Edit$6({ auth, group, streams, substreams }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: "PUT",
    name: group.name,
    stream_id: group.stream_id,
    substream_id: group.substream_id
  });
  const [isEnabled, setIsEnabled] = useState(group.stream_id === null);
  const submit = (e) => {
    e.preventDefault();
    Inertia.put(route("group.update", { group }), data);
  };
  const handleStreamChange = (newValue) => {
    setData("stream_id", newValue);
  };
  const handleSubStreamChange = (newValue) => {
    setData("substream_id", newValue);
  };
  const changeGroupType = (newValue) => {
    if (newValue === true) {
      setData("substream_id", null);
    } else {
      setData("stream_id", null);
    }
    setIsEnabled(newValue);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "group edit" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "group edit" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Is group" }),
          /* @__PURE__ */ jsx(
            InputSwitch,
            {
              initialValue: isEnabled,
              onChange: changeGroupType
            }
          ),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "group name" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          isEnabled ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                className: "mt-3",
                htmlFor: "substream_id",
                value: "Sub Stream"
              }
            ),
            /* @__PURE__ */ jsx(
              Select,
              {
                options: substreams,
                defaultValue: "Виберіть поток групи",
                defaultSelectable: false,
                value: data.substream_id,
                onChange: handleSubStreamChange
              }
            )
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                className: "mt-3",
                htmlFor: "stream_id",
                value: "Stream"
              }
            ),
            /* @__PURE__ */ jsx(
              Select,
              {
                options: streams,
                defaultValue: "Виберіть поток",
                defaultSelectable: false,
                value: data.stream_id,
                onChange: handleStreamChange
              }
            )
          ] }),
          /* @__PURE__ */ jsx(InputError, { message: errors.stream_id, className: "mt-2" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.substream_id, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { className: "text-[1rem]", children: "Update" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$6
}, Symbol.toStringTag, { value: "Module" }));
function Index$5({ auth, groups, can: can2, message, error }) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      ).content;
      fetch(route("group.destroy", id), {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken
        }
      }).then(() => {
        window.location.reload();
      });
    }
  }
  const [openOptions, setOpenOptions] = useState(false);
  const [elementId, setElementId] = useState(null);
  const openOptionsModal = (id) => {
    setOpenOptions(true);
    setElementId(id);
  };
  const closeModal = () => {
    setOpenOptions(false);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Groups" }),
      addElement: can2.create,
      searchField: true,
      sortOptions: [
        { key: "id", label: "Id (Ascending)" },
        { key: "-id", label: "Id (Descending)" },
        { key: "name", label: "Name (A to Z)" },
        { key: "-name", label: "Name (Z to A)" }
      ],
      filterOptions: [
        { key: "group", value: null },
        { key: "substream", value: null }
      ],
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Groups" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "admin-list", children: groups.data.map((element, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "card-default",
              onClick: () => openOptionsModal(index),
              children: [
                /* @__PURE__ */ jsx("h5", { className: "form-text", children: element.name }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Updated at",
                  " ",
                  /* @__PURE__ */ jsx(
                    DateFormatted,
                    {
                      inputDate: element.updated_at
                    }
                  )
                ] })
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsx(Modal, { show: openOptions, onClose: closeModal, children: groups.data[elementId] && /* @__PURE__ */ jsxs("div", { className: "card-modal", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "fixed right-4",
                onClick: closeModal,
                children: /* @__PURE__ */ jsx(Icon, { icon: "mdi:close" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Name" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_a = groups.data[elementId]) == null ? void 0 : _a.name })
            ] }),
            ((_b = groups.data[elementId]) == null ? void 0 : _b.stream) ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Stream" }),
              /* @__PURE__ */ jsxs("h5", { className: "form-text", children: [
                (_c = groups.data[elementId]) == null ? void 0 : _c.stream.name,
                /* @__PURE__ */ jsxs("small", { children: [
                  "(",
                  (_d = groups.data[elementId]) == null ? void 0 : _d.stream.course,
                  "к)"
                ] })
              ] })
            ] }) : null,
            ((_e = groups.data[elementId]) == null ? void 0 : _e.substream) ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Sub stream" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_f = groups.data[elementId]) == null ? void 0 : _f.substream.name })
            ] }) : null,
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1 m-auto", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Created at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_g = groups.data[elementId]) == null ? void 0 : _g.created_at
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Updated at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_h = groups.data[elementId]) == null ? void 0 : _h.updated_at
                  }
                )
              ] })
            ] }),
            can2.edit && /* @__PURE__ */ jsxs(
              "a",
              {
                className: "admin-edit",
                href: route(
                  "group.edit",
                  groups.data[elementId].id
                ),
                children: [
                  "Edit ",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:pencil" })
                ]
              }
            ),
            can2.delete && /* @__PURE__ */ jsxs(
              "button",
              {
                className: "admin-delete",
                onClick: () => destroy(groups.data[elementId].id),
                children: [
                  "Delete",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:trash" })
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { pageContent: groups })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$5
}, Symbol.toStringTag, { value: "Module" }));
function Create$4({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("permission.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Permission create" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Permission create" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Permission name" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { className: "text-[1rem]", children: "Create" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$4
}, Symbol.toStringTag, { value: "Module" }));
function Edit$5({ auth, permission }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: "PUT",
    name: permission.name
  });
  const submit = (e) => {
    e.preventDefault();
    Inertia.put(
      route("permission.update", { permission }),
      data
    );
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Permission edit" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Permission edit" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Назва" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { children: "Update" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$5
}, Symbol.toStringTag, { value: "Module" }));
function Index$4({ auth, permissions, can: can2, message, error }) {
  var _a, _b, _c;
  function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      ).content;
      fetch(route("permission.destroy", id), {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken
        }
      }).then(() => {
        window.location.reload();
      });
    }
  }
  const [openOptions, setOpenOptions] = useState(false);
  const [elementId, setElementId] = useState(null);
  const openOptionsModal = (id) => {
    setOpenOptions(true);
    setElementId(id);
  };
  const closeModal = () => {
    setOpenOptions(false);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Permissions" }),
      addElement: can2.create,
      searchField: true,
      sortOptions: [
        { key: "id", label: "Id (Ascending)" },
        { key: "-id", label: "Id (Descending)" },
        { key: "name", label: "Name (A to Z)" },
        { key: "-name", label: "Name (Z to A)" }
      ],
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Permissions" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "admin-list", children: permissions.data.map((element, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "card-default",
              onClick: () => openOptionsModal(index),
              children: [
                /* @__PURE__ */ jsx("h5", { className: "form-text", children: element.name }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Updated at",
                  " ",
                  /* @__PURE__ */ jsx(
                    DateFormatted,
                    {
                      inputDate: element.updated_at
                    }
                  )
                ] })
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsx(Modal, { show: openOptions, onClose: closeModal, children: permissions.data[elementId] && /* @__PURE__ */ jsxs("div", { className: "card-modal", children: [
            /* @__PURE__ */ jsx("button", { className: "fixed right-4", onClick: closeModal, children: /* @__PURE__ */ jsx(Icon, { icon: "mdi:close" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Name" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_a = permissions.data[elementId]) == null ? void 0 : _a.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1 m-auto", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Created at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_b = permissions.data[elementId]) == null ? void 0 : _b.created_at
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Updated at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_c = permissions.data[elementId]) == null ? void 0 : _c.updated_at
                  }
                )
              ] })
            ] }),
            can2.edit && /* @__PURE__ */ jsxs(
              "a",
              {
                className: "admin-edit",
                href: route(
                  "permission.edit",
                  permissions.data[elementId].id
                ),
                children: [
                  "Edit ",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:pencil" })
                ]
              }
            ),
            can2.delete && /* @__PURE__ */ jsxs(
              "button",
              {
                className: "admin-delete",
                onClick: () => destroy(permissions.data[elementId].id),
                children: [
                  "Delete",
                  /* @__PURE__ */ jsx(
                    Icon,
                    {
                      icon: "mdi:trash"
                    }
                  )
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { pageContent: permissions })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$4
}, Symbol.toStringTag, { value: "Module" }));
function Create$3({ auth, permissions }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    permissions: []
  });
  const handleCheckers = (event) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
      setData((prevItems) => ({
        ...prevItems,
        permissions: [...prevItems.permissions, value]
      }));
    } else {
      setData((prevItems) => ({
        ...prevItems,
        permissions: prevItems.permissions.filter(
          (item) => item !== value
        )
      }));
    }
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("role.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Role create" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Role create" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Назва" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx("div", { className: "block mt-4", children: Object.entries(permissions).map(([key, value]) => /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                name: value,
                value: key,
                checked: data.permissions.includes(
                  parseInt(key)
                ),
                onChange: handleCheckers
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 dark:text-gray-400", children: value })
          ] })) }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { children: "Create" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$3
}, Symbol.toStringTag, { value: "Module" }));
function Edit$4({ auth, role, permissions, roleHasPermissions }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: "PUT",
    name: role.name,
    permissions: roleHasPermissions
  });
  const handleCheckers = (event) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
      setData((prevItems) => ({
        ...prevItems,
        permissions: [...prevItems.permissions, value]
      }));
    } else {
      setData((prevItems) => ({
        ...prevItems,
        permissions: prevItems.permissions.filter(
          (item) => item !== value
        )
      }));
    }
  };
  const submit = (e) => {
    e.preventDefault();
    Inertia.put(route("role.update", { role }), data);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Role edit" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Role edit" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Назва" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx("div", { className: "block mt-4", children: Object.entries(permissions).map(([key, value]) => /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                name: key,
                value: key,
                checked: data.permissions.includes(
                  parseInt(key)
                ),
                onChange: handleCheckers
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 dark:text-gray-400", children: value })
          ] })) }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { children: "Update" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$4
}, Symbol.toStringTag, { value: "Module" }));
function Index$3({ auth, roles, can: can2, message, error }) {
  var _a, _b, _c, _d, _e;
  function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      ).content;
      fetch(route("role.destroy", id), {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken
        }
      }).then(() => {
        window.location.reload();
      });
    }
  }
  const [openOptions, setOpenOptions] = useState(false);
  const [elementId, setElementId] = useState(null);
  const openOptionsModal = (id) => {
    setOpenOptions(true);
    setElementId(id);
  };
  const closeModal = () => {
    setOpenOptions(false);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Ролі користувачів" }),
      addElement: can2.create,
      searchField: true,
      sortOptions: [
        { key: "id", label: "Id (Ascending)" },
        { key: "-id", label: "Id (Descending)" },
        { key: "name", label: "Name (A to Z)" },
        { key: "-name", label: "Name (Z to A)" }
      ],
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Ролі користувачів" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "admin-list", children: roles.data.map((element, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "card-default flex",
              onClick: () => openOptionsModal(index),
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h5", { className: "form-text", children: element.name }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Updated at",
                    " ",
                    /* @__PURE__ */ jsx(
                      DateFormatted,
                      {
                        inputDate: element.updated_at
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "hidden lg:block flex-1", children: element.permissions.length == 0 ? /* @__PURE__ */ jsx("div", { className: "options-block", children: /* @__PURE__ */ jsx("div", { className: "chip", children: "No data" }) }) : /* @__PURE__ */ jsx("div", { className: "options-block", children: element.permissions.map(
                  (element2) => /* @__PURE__ */ jsx("div", { className: "chip", children: element2.name })
                ) }) })
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsx(Modal, { show: openOptions, onClose: closeModal, children: roles.data[elementId] && /* @__PURE__ */ jsxs("div", { className: "card-modal", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "fixed right-4 outline-0",
                onClick: closeModal,
                children: /* @__PURE__ */ jsx(Icon, { icon: "mdi:close" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Name" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_a = roles.data[elementId]) == null ? void 0 : _a.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Permissions" }),
              ((_b = roles.data[elementId]) == null ? void 0 : _b.permissions.length) == 0 ? /* @__PURE__ */ jsx("div", { className: "options-block", children: /* @__PURE__ */ jsx("div", { className: "chip", children: "No data" }) }) : /* @__PURE__ */ jsx("div", { className: "options-block", children: (_c = roles.data[elementId]) == null ? void 0 : _c.permissions.map((element) => /* @__PURE__ */ jsx("div", { className: "chip", children: element.name })) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1 m-auto", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Created at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_d = roles.data[elementId]) == null ? void 0 : _d.created_at
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Updated at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_e = roles.data[elementId]) == null ? void 0 : _e.updated_at
                  }
                )
              ] })
            ] }),
            can2.edit && /* @__PURE__ */ jsxs(
              "a",
              {
                className: "admin-edit",
                href: route(
                  "role.edit",
                  roles.data[elementId].id
                ),
                children: [
                  "Edit ",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:pencil" })
                ]
              }
            ),
            can2.delete && /* @__PURE__ */ jsxs(
              "button",
              {
                className: "admin-delete",
                onClick: () => destroy(roles.data[elementId].id),
                children: [
                  "Delete",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:trash" })
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { pageContent: roles })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$3
}, Symbol.toStringTag, { value: "Module" }));
function Create$2({ auth, departments }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    course: 1,
    department_id: 1
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("stream.store"));
  };
  const handleSelectChange = (newValue) => {
    setData("department_id", newValue);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Stream create" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Stream create" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Stream name" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              className: "mt-3",
              htmlFor: "short",
              value: "Course"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "course",
              name: "course",
              type: "number",
              min: "1",
              max: "6",
              value: data.course,
              className: "mt-1 block w-full",
              autoComplete: "course",
              isFocused: true,
              onChange: (e) => setData("course", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.course, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              className: "mt-3",
              htmlFor: "department_id",
              value: "Department"
            }
          ),
          /* @__PURE__ */ jsx(
            Select,
            {
              options: departments,
              defaultValue: "Виберіть факультет",
              defaultSelectable: false,
              value: data.department_id,
              onChange: handleSelectChange
            }
          ),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { className: "text-[1rem]", children: "Create" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$2
}, Symbol.toStringTag, { value: "Module" }));
function Edit$3({ auth, stream, departments }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: "PUT",
    name: stream.name,
    course: stream.course,
    department_id: stream.department_id
  });
  const submit = (e) => {
    e.preventDefault();
    Inertia.put(
      route("stream.update", { stream }),
      data
    );
  };
  const handleSelectChange = (newValue) => {
    setData("department_id", newValue);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Stream edit" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Stream edit" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Stream name" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              className: "mt-3",
              htmlFor: "short",
              value: "Course"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "course",
              name: "course",
              type: "number",
              min: "1",
              max: "6",
              value: data.course,
              className: "mt-1 block w-full",
              autoComplete: "course",
              isFocused: true,
              onChange: (e) => setData("course", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.course, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              className: "mt-3",
              htmlFor: "department_id",
              value: "Department"
            }
          ),
          /* @__PURE__ */ jsx(
            Select,
            {
              options: departments,
              defaultValue: "Виберіть факультет",
              defaultSelectable: false,
              value: data.department_id,
              onChange: handleSelectChange
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.department_id, className: "mt-2" }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { className: "text-[1rem]", children: "Update" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$3
}, Symbol.toStringTag, { value: "Module" }));
function Index$2({ auth, streams, can: can2, message, error }) {
  var _a, _b, _c, _d, _e;
  function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      ).content;
      fetch(route("stream.destroy", id), {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken
        }
      }).then(() => {
        window.location.reload();
      });
    }
  }
  const [openOptions, setOpenOptions] = useState(false);
  const [elementId, setElementId] = useState(null);
  const openOptionsModal = (id) => {
    setOpenOptions(true);
    setElementId(id);
  };
  const closeModal = () => {
    setOpenOptions(false);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "streams" }),
      addElement: can2.create,
      searchField: true,
      sortOptions: [
        { key: "id", label: "Id (Ascending)" },
        { key: "-id", label: "Id (Descending)" },
        { key: "name", label: "Name (A to Z)" },
        { key: "-name", label: "Name (Z to A)" }
      ],
      children: [
        /* @__PURE__ */ jsx(Head, { title: "streams" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "admin-list", children: streams.data.map((element, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "card-default",
              onClick: () => openOptionsModal(index),
              children: [
                /* @__PURE__ */ jsxs("h5", { className: "form-text", children: [
                  element.name,
                  /* @__PURE__ */ jsxs("small", { children: [
                    "(",
                    element.course,
                    "к)"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Updated at",
                  " ",
                  /* @__PURE__ */ jsx(
                    DateFormatted,
                    {
                      inputDate: element.updated_at
                    }
                  )
                ] })
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsx(Modal, { show: openOptions, onClose: closeModal, children: streams.data[elementId] && /* @__PURE__ */ jsxs("div", { className: "card-modal", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "fixed right-4",
                onClick: closeModal,
                children: /* @__PURE__ */ jsx(Icon, { icon: "mdi:close" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Name" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_a = streams.data[elementId]) == null ? void 0 : _a.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Course" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_b = streams.data[elementId]) == null ? void 0 : _b.course })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Department" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_c = streams.data[elementId]) == null ? void 0 : _c.department.short })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1 m-auto", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Created at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_d = streams.data[elementId]) == null ? void 0 : _d.created_at
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Updated at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_e = streams.data[elementId]) == null ? void 0 : _e.updated_at
                  }
                )
              ] })
            ] }),
            can2.edit && /* @__PURE__ */ jsxs(
              "a",
              {
                className: "admin-edit",
                href: route(
                  "stream.edit",
                  streams.data[elementId].id
                ),
                children: [
                  "Edit ",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:pencil" })
                ]
              }
            ),
            can2.delete && /* @__PURE__ */ jsxs(
              "button",
              {
                className: "admin-delete",
                onClick: () => destroy(streams.data[elementId].id),
                children: [
                  "Delete",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:trash" })
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { pageContent: streams })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard$2({ auth }) {
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: "You're logged in admin!" }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard$2
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard$1({ auth }) {
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: "You're logged in admin!" }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard$1
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard({ auth }) {
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Dashboard" }),
      addElement: can.create,
      searchField: true,
      sortOptions: [
        { key: "id", label: "Id (Ascending)" },
        { key: "-id", label: "Id (Descending)" },
        { key: "name", label: "Name (A to Z)" },
        { key: "-name", label: "Name (Z to A)" }
      ],
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: "You're logged in admin!" }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
function Radio({
  className = "",
  label,
  checked = false,
  disabled = false,
  // Add disabled prop
  onChange,
  ...props
}) {
  const handleRadioChange = () => {
    if (onChange && !disabled) {
      onChange();
    }
  };
  return /* @__PURE__ */ jsxs(
    "label",
    {
      className: `form-radio ${className} ${disabled ? "disabled" : ""}`,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...props,
            type: "radio",
            className: "form-radio-input",
            checked,
            onChange: handleRadioChange,
            disabled
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `form-radio-icon ${checked ? "active" : ""}`
          }
        ),
        label && /* @__PURE__ */ jsx("span", { className: "form-radio-label", children: label })
      ]
    }
  );
}
const TimetableSelect = ({ data, setData }) => {
  const [selectedWeek, setSelectedWeek] = useState(data.week);
  const [selectedDay, setSelectedDay] = useState(data.day);
  const [selectedLesson, setSelectedLesson] = useState(data.lesson);
  useEffect(() => {
    setSelectedWeek(data.week);
    setSelectedDay(data.day);
    setSelectedLesson(data.lesson);
  }, [data]);
  const handleCellClick = (week, day, lesson) => {
    setSelectedWeek(week);
    setSelectedDay(day);
    setSelectedLesson(lesson);
    setData({
      ...data,
      week,
      day,
      lesson
    });
  };
  const dayLabels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  const renderTable = () => {
    const weeks = ["Week 1", "Week 2"];
    const days = [0, 1, 2, 3, 4, 5];
    const lessons = [1, 2, 3, 4, 5, 6];
    return /* @__PURE__ */ jsx("div", { className: "table-container", children: weeks.map((week, weekIndex) => /* @__PURE__ */ jsxs("table", { className: "admin-timetable", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: week }),
        lessons.map((lesson) => /* @__PURE__ */ jsx("th", { className: "lesson-order", children: lesson }, lesson))
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: days.map((day) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: dayLabels[day] }),
        lessons.map((lesson) => /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "label",
          {
            className: `cell-label ${weekIndex + 1 === selectedWeek && day + 1 === selectedDay && lesson === selectedLesson ? "active" : ""}`,
            children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: `cell-${weekIndex + 1}-${day + 1}`,
                checked: weekIndex + 1 === selectedWeek && day + 1 === selectedDay && lesson === selectedLesson,
                onChange: () => handleCellClick(
                  weekIndex + 1,
                  day + 1,
                  lesson
                )
              }
            )
          }
        ) }, lesson))
      ] }, day)) })
    ] }, weekIndex)) });
  };
  return /* @__PURE__ */ jsx("div", { className: "mt-3", children: renderTable() });
};
function Create$1({ auth, groups }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    teacher: "",
    type: 0,
    week: 1,
    day: 1,
    lesson: 1,
    auditory: "",
    pgroup: 0,
    group_id: null
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("timetable.store"));
  };
  const handleSelectChange = (newValue) => {
    setData("group_id", newValue);
  };
  const handleTypeChange = (newValue) => {
    setData("type", newValue);
  };
  useEffect(() => {
    if (data.type == 2) {
      setData("pgroup", 1);
    } else {
      setData("pgroup", 0);
    }
  }, [data.type]);
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Lesson create" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Lesson create" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Group" }),
          /* @__PURE__ */ jsx(
            Select,
            {
              options: groups,
              defaultValue: "Виберіть групу",
              defaultSelectable: false,
              value: data.group_id,
              onChange: handleSelectChange
            }
          ),
          data.group_id != null ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                htmlFor: "name",
                value: "Lesson name",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "name",
                name: "name",
                value: data.name,
                className: "mt-1 block w-full",
                autoComplete: "name",
                isFocused: true,
                onChange: (e) => setData("name", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.name,
                className: "mt-2"
              }
            ),
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                className: "mt-3",
                htmlFor: "teacher",
                value: "Teacher"
              }
            ),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "teacher",
                name: "teacher",
                value: data.teacher,
                className: "mt-1 block w-full",
                autoComplete: "teacher",
                isFocused: true,
                onChange: (e) => setData("teacher", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.teacher,
                className: "mt-2"
              }
            ),
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                className: "mt-3",
                htmlFor: "auditory",
                value: "Auditory"
              }
            ),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "auditory",
                name: "auditory",
                value: data.auditory,
                className: "mt-1 block w-full",
                autoComplete: "auditory",
                isFocused: true,
                onChange: (e) => setData("auditory", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.auditory,
                className: "mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsx(
                Radio,
                {
                  label: "Лекція",
                  checked: data.type == 0,
                  onChange: () => handleTypeChange("0")
                }
              ),
              /* @__PURE__ */ jsx(
                Radio,
                {
                  label: "Практична",
                  checked: data.type == 1,
                  onChange: () => handleTypeChange("1")
                }
              ),
              /* @__PURE__ */ jsx(
                Radio,
                {
                  label: "Лабораторна",
                  checked: data.type == 2,
                  onChange: () => handleTypeChange("2")
                }
              )
            ] }),
            data.type == 2 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                InputLabel,
                {
                  className: "mt-3",
                  htmlFor: "pgroup",
                  value: "Підгрупа"
                }
              ),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "pgroup",
                  name: "pgroup",
                  type: "number",
                  min: "1",
                  max: "4",
                  value: data.pgroup,
                  className: "mt-1 block w-full",
                  autoComplete: "pgroup",
                  isFocused: true,
                  onChange: (e) => setData(
                    "pgroup",
                    e.target.value
                  ),
                  required: true
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsx(
              TimetableSelect,
              {
                data,
                setData
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.lesson,
                className: "mt-2"
              }
            ),
            /* @__PURE__ */ jsx(
              PrimaryButton,
              {
                className: "w-full grid mt-6",
                disabled: processing,
                children: /* @__PURE__ */ jsx("span", { className: "text-[1rem]", children: "Create" })
              }
            )
          ] }) : null
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$1
}, Symbol.toStringTag, { value: "Module" }));
function Edit$2({ auth, timetable, groups }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: timetable.name,
    teacher: timetable.teacher,
    type: timetable.type,
    week: timetable.week,
    day: timetable.day,
    lesson: timetable.lesson,
    auditory: timetable.auditory,
    pgroup: timetable.pgroup,
    group_id: timetable.group_id
  });
  const submit = (e) => {
    e.preventDefault();
    Inertia.put(
      route("timetable.update", { timetable }),
      data
    );
  };
  const handleSelectChange = (newValue) => {
    setData("group_id", newValue);
  };
  const handleTypeChange = (newValue) => {
    setData("type", newValue);
  };
  useEffect(() => {
    if (data.type == 2) {
      setData("pgroup", 1);
    } else {
      setData("pgroup", 0);
    }
  }, [data.type]);
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Timetable edit" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Timetable edit" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Group" }),
          /* @__PURE__ */ jsx(
            Select,
            {
              options: groups,
              defaultValue: "Виберіть групу",
              defaultSelectable: false,
              value: data.group_id,
              onChange: handleSelectChange
            }
          ),
          data.group_id != null ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                htmlFor: "name",
                value: "Lesson name",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "name",
                name: "name",
                value: data.name,
                className: "mt-1 block w-full",
                autoComplete: "name",
                isFocused: true,
                onChange: (e) => setData("name", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.name,
                className: "mt-2"
              }
            ),
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                className: "mt-3",
                htmlFor: "teacher",
                value: "Teacher"
              }
            ),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "teacher",
                name: "teacher",
                value: data.teacher,
                className: "mt-1 block w-full",
                autoComplete: "teacher",
                isFocused: true,
                onChange: (e) => setData("teacher", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.teacher,
                className: "mt-2"
              }
            ),
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                className: "mt-3",
                htmlFor: "auditory",
                value: "Auditory"
              }
            ),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "auditory",
                name: "auditory",
                value: data.auditory,
                className: "mt-1 block w-full",
                autoComplete: "auditory",
                isFocused: true,
                onChange: (e) => setData("auditory", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.auditory,
                className: "mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsx(
                Radio,
                {
                  label: "Лекція",
                  checked: data.type == 0,
                  onChange: () => handleTypeChange("0")
                }
              ),
              /* @__PURE__ */ jsx(
                Radio,
                {
                  label: "Практична",
                  checked: data.type == 1,
                  onChange: () => handleTypeChange("1")
                }
              ),
              /* @__PURE__ */ jsx(
                Radio,
                {
                  label: "Лабораторна",
                  checked: data.type == 2,
                  onChange: () => handleTypeChange("2")
                }
              )
            ] }),
            data.type == 2 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                InputLabel,
                {
                  className: "mt-3",
                  htmlFor: "pgroup",
                  value: "Підгрупа"
                }
              ),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "pgroup",
                  name: "pgroup",
                  type: "number",
                  min: "1",
                  max: "4",
                  value: data.pgroup,
                  className: "mt-1 block w-full",
                  autoComplete: "pgroup",
                  isFocused: true,
                  onChange: (e) => setData(
                    "pgroup",
                    e.target.value
                  ),
                  required: true
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsx(
              TimetableSelect,
              {
                data,
                setData
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.lesson,
                className: "mt-2"
              }
            ),
            /* @__PURE__ */ jsx(
              PrimaryButton,
              {
                className: "w-full grid mt-6",
                disabled: processing,
                children: /* @__PURE__ */ jsx("span", { className: "text-[1rem]", children: "Update" })
              }
            )
          ] }) : null
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$2
}, Symbol.toStringTag, { value: "Module" }));
function Index$1({ auth, timetables, can: can2, message, error }) {
  var _a, _b, _c, _d, _e;
  function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      ).content;
      fetch(route("timetable.destroy", id), {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken
        }
      }).then(() => {
        window.location.reload();
      });
    }
  }
  const [openOptions, setOpenOptions] = useState(false);
  const [elementId, setElementId] = useState(null);
  const openOptionsModal = (id) => {
    setOpenOptions(true);
    setElementId(id);
  };
  const closeModal = () => {
    setOpenOptions(false);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Timetables" }),
      addElement: can2.create,
      searchField: true,
      sortOptions: [
        { key: "id", label: "Id (Ascending)" },
        { key: "-id", label: "Id (Descending)" },
        { key: "name", label: "Name (A to Z)" },
        { key: "-name", label: "Name (Z to A)" }
      ],
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Timetables" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "admin-list", children: timetables.data.map((element, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "card-default",
              onClick: () => openOptionsModal(index),
              children: [
                /* @__PURE__ */ jsxs("h5", { className: "form-text", children: [
                  element.name,
                  /* @__PURE__ */ jsxs("small", { children: [
                    "(",
                    element.week,
                    "|",
                    element.day,
                    "|",
                    element.lesson,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Updated at",
                  " ",
                  /* @__PURE__ */ jsx(
                    DateFormatted,
                    {
                      inputDate: element.updated_at
                    }
                  )
                ] })
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsx(Modal, { show: openOptions, onClose: closeModal, children: timetables.data[elementId] && /* @__PURE__ */ jsxs("div", { className: "card-modal", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "fixed right-4",
                onClick: closeModal,
                children: /* @__PURE__ */ jsx(Icon, { icon: "mdi:close" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Name" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_a = timetables.data[elementId]) == null ? void 0 : _a.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Course" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_b = timetables.data[elementId]) == null ? void 0 : _b.course })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Group" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_c = timetables.data[elementId]) == null ? void 0 : _c.group.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1 m-auto", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Created at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_d = timetables.data[elementId]) == null ? void 0 : _d.created_at
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Updated at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_e = timetables.data[elementId]) == null ? void 0 : _e.updated_at
                  }
                )
              ] })
            ] }),
            can2.edit && /* @__PURE__ */ jsxs(
              "a",
              {
                className: "admin-edit",
                href: route(
                  "timetable.edit",
                  timetables.data[elementId].id
                ),
                children: [
                  "Edit ",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:pencil" })
                ]
              }
            ),
            can2.delete && /* @__PURE__ */ jsxs(
              "button",
              {
                className: "admin-delete",
                onClick: () => destroy(timetables.data[elementId].id),
                children: [
                  "Delete",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:trash" })
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { pageContent: timetables })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function Create({ auth, roles, groups }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    group_id: 1,
    roles: []
  });
  const handleCheckers = (event) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
      setData((prevItems) => ({
        ...prevItems,
        roles: [...prevItems.roles, value]
      }));
    } else {
      setData((prevItems) => ({
        ...prevItems,
        roles: prevItems.roles.filter((item) => item !== value)
      }));
    }
  };
  const handleSelectChange = (newValue) => {
    setData("group_id", newValue);
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("user.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "User create" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "User create" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Назва" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Пошта" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "email",
              name: "email",
              value: data.email,
              className: "mt-1 block w-full",
              autoComplete: "mail",
              isFocused: true,
              onChange: (e) => setData("email", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Пароль" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "password",
              id: "password",
              name: "password",
              value: data.password,
              className: "mt-1 block w-full",
              autoComplete: "password",
              isFocused: true,
              onChange: (e) => setData("password", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.password,
              className: "mt-2"
            }
          ),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "password_confirmation",
              value: "Підтвердіть пароль"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "password",
              id: "password_confirmation",
              name: "password_confirmation",
              value: data.password_confirmation,
              className: "mt-1 block w-full",
              autoComplete: "password",
              isFocused: true,
              onChange: (e) => setData("password_confirmation", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.password,
              className: "mt-2"
            }
          ),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Group" }),
          /* @__PURE__ */ jsx(
            Select,
            {
              options: groups,
              defaultValue: "Виберіть групу",
              defaultSelectable: false,
              value: data.group_id,
              onChange: handleSelectChange
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "block mt-4", children: Object.entries(roles).map(([key, value]) => /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                name: value,
                value: key,
                checked: data.roles.includes(
                  parseInt(key)
                ),
                onChange: handleCheckers
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 dark:text-gray-400", children: value })
          ] })) }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "mt-16 w-full grid",
              disabled: processing,
              children: /* @__PURE__ */ jsx("span", { children: "Create" })
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
function Edit$1({ auth, user, roles, groups }) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: user.name,
    email: user.email,
    roles: user.roles.map((role) => role.id),
    group_id: user.group_id,
    password: "",
    password_confirmation: ""
  });
  const handleCheckers = (event) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
      setData((prevItems) => ({
        ...prevItems,
        roles: [...prevItems.roles, value]
      }));
    } else {
      setData((prevItems) => ({
        ...prevItems,
        roles: prevItems.roles.filter((item) => item !== value)
      }));
    }
  };
  const handleSelectChange = (newValue) => {
    setData("group_id", newValue);
  };
  const submit = (e) => {
    e.preventDefault();
    Inertia.put(route("user.update", { user }), data);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "User edit" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "User edit" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { className: "px-4 py-8", onSubmit: submit, children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Ім'я" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Пошта" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "email",
              name: "email",
              value: data.email,
              className: "mt-1 block w-full",
              autoComplete: "email",
              isFocused: true,
              onChange: (e) => setData("email", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Пароль" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password",
              name: "password",
              value: data.password,
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "new-password",
              isFocused: true,
              onChange: (e) => setData("password", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.password,
              className: "mt-2"
            }
          ),
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "password_confirmation",
              value: "Підтвердіть пароль"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password_confirmation",
              name: "password_confirmation",
              value: data.password_confirmation,
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "new-password",
              isFocused: true,
              onChange: (e) => setData("password_confirmation", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.password_confirmation,
              className: "mt-2"
            }
          ),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Group" }),
          /* @__PURE__ */ jsx(
            Select,
            {
              options: groups,
              defaultValue: "Виберіть групу",
              defaultSelectable: false,
              value: data.group_id,
              onChange: handleSelectChange
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "block mt-4", children: Object.entries(roles).map(([key, value]) => /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                name: value,
                value: key,
                checked: data.roles.includes(
                  parseInt(key)
                ),
                onChange: handleCheckers
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 dark:text-gray-400", children: value })
          ] }, key)) }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              onClick: submit,
              disabled: processing,
              className: "mt-8 w-full",
              children: "Update"
            }
          )
        ] }) }) })
      ]
    }
  );
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$1
}, Symbol.toStringTag, { value: "Module" }));
function Index({ auth, users, can: can2, message, error }) {
  var _a, _b, _c, _d, _e, _f;
  function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      ).content;
      fetch(route("user.destroy", id), {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken
        }
      }).then(() => {
        window.location.reload();
      });
    }
  }
  const [openOptions, setOpenOptions] = useState(false);
  const [elementId, setElementId] = useState(null);
  const openOptionsModal = (id) => {
    setOpenOptions(true);
    setElementId(id);
  };
  const closeModal = () => {
    setOpenOptions(false);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);
  return /* @__PURE__ */ jsxs(
    Authenticated$1,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg lg:text-2xl", children: "Користувачі" }),
      addElement: can2.create,
      searchField: true,
      sortOptions: [
        { key: "id", label: "Id (Ascending)" },
        { key: "-id", label: "Id (Descending)" },
        { key: "name", label: "Name (A to Z)" },
        { key: "-name", label: "Name (Z to A)" }
      ],
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Користувачі" }),
        /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "admin-list", children: users.data.map((element, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "card-default flex",
              onClick: () => openOptionsModal(index),
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h5", { className: "form-text", children: element.name }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Updated at",
                    " ",
                    /* @__PURE__ */ jsx(
                      DateFormatted,
                      {
                        inputDate: element.updated_at
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "hidden lg:block flex-1", children: element.roles.length == 0 ? /* @__PURE__ */ jsx("div", { className: "options-block", children: /* @__PURE__ */ jsx("div", { className: "chip", children: "No data" }) }) : /* @__PURE__ */ jsx("div", { className: "options-block", children: element.roles.map(
                  (element2, key) => /* @__PURE__ */ jsx("div", { className: "chip", children: element2.name }, key)
                ) }) })
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsx(Modal, { show: openOptions, onClose: closeModal, children: users.data[elementId] && /* @__PURE__ */ jsxs("div", { className: "card-modal", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "fixed right-4",
                onClick: closeModal,
                children: /* @__PURE__ */ jsx(Icon, { icon: "mdi:close" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Name" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_a = users.data[elementId]) == null ? void 0 : _a.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Email" }),
              /* @__PURE__ */ jsx("h5", { className: "form-text", children: (_b = users.data[elementId]) == null ? void 0 : _b.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "form-label", children: "Roles" }),
              ((_c = users.data[elementId]) == null ? void 0 : _c.roles.length) == 0 ? /* @__PURE__ */ jsx("div", { className: "options-block", children: /* @__PURE__ */ jsx("div", { className: "chip", children: "No data" }) }) : /* @__PURE__ */ jsx("div", { className: "options-block", children: (_d = users.data[elementId]) == null ? void 0 : _d.roles.map(
                (element) => /* @__PURE__ */ jsx("div", { className: "chip", children: element.name })
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1 m-auto", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Created at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_e = users.data[elementId]) == null ? void 0 : _e.created_at
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Updated at",
                " ",
                /* @__PURE__ */ jsx(
                  DateFormatted,
                  {
                    inputDate: (_f = users.data[elementId]) == null ? void 0 : _f.updated_at
                  }
                )
              ] })
            ] }),
            can2.edit && /* @__PURE__ */ jsxs(
              "a",
              {
                className: "admin-edit",
                href: route(
                  "user.edit",
                  users.data[elementId].id
                ),
                children: [
                  "Edit ",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:pencil" })
                ]
              }
            ),
            can2.delete && /* @__PURE__ */ jsxs(
              "button",
              {
                className: "admin-delete",
                onClick: () => destroy(users.data[elementId].id),
                children: [
                  "Delete",
                  /* @__PURE__ */ jsx(Icon, { icon: "mdi:trash" })
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Pagination, { pageContent: users })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
function Guest({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-20 h-20 fill-current text-gray-500" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg", children })
  ] });
}
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: "This is a secure area of the application. Please confirm your password before continuing." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-4", disabled: processing, children: "Confirm" }) })
    ] })
  ] });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600 dark:text-green-400", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-4", disabled: processing, children: "Email Password Reset Link" }) })
    ] })
  ] });
}
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            isFocused: true,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "current-password",
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "block mt-4", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            name: "remember",
            checked: data.remember,
            onChange: (e) => setData("remember", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 dark:text-gray-400", children: "Remember me" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-4", children: [
        canResetPassword && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("password.request"),
            className: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",
            children: "Forgot your password?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-4", disabled: processing, children: "Log in" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("register"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            value: data.name,
            className: "mt-1 block w-full",
            autoComplete: "name",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",
            children: "Already registered?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-4", disabled: processing, children: "Register" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-4", disabled: processing, children: "Reset Password" }) })
    ] })
  ] });
}
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600 dark:text-green-400", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",
          children: "Log Out"
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
function NavLink({ active = false, className = "", children, ...props }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " + (active ? "border-indigo-400 dark:border-indigo-600 text-gray-900 dark:text-gray-100 focus:border-indigo-700 " : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ") + className,
      children
    }
  );
}
function ResponsiveNavLink({ active = false, className = "", children, ...props }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${active ? "border-indigo-400 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 focus:text-indigo-800 dark:focus:text-indigo-200 focus:bg-indigo-100 dark:focus:bg-indigo-900 focus:border-indigo-700 dark:focus:border-indigo-300" : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600"} text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`,
      children
    }
  );
}
function Authenticated({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxs("nav", { className: "bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 flex items-center", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, {}) }) }),
          /* @__PURE__ */ jsx("div", { className: "hidden space-x-8 sm:-my-px sm:ml-10 sm:flex", children: /* @__PURE__ */ jsx(NavLink, { href: route("dashboard"), active: route().current("dashboard"), children: "Головна" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:flex sm:items-center sm:ml-6", children: /* @__PURE__ */ jsx("div", { className: "ml-3 relative", children: /* @__PURE__ */ jsxs(Dropdown, { children: [
          /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-md", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150",
              children: [
                user.name,
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "ml-2 -mr-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                        clipRule: "evenodd"
                      }
                    )
                  }
                )
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
            /* @__PURE__ */ jsx(Dropdown.Link, { href: route("profile.edit"), children: "Profile" }),
            /* @__PURE__ */ jsx(Dropdown.Link, { href: route("logout"), method: "post", as: "button", children: "Log Out" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "-mr-2 flex items-center sm:hidden", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowingNavigationDropdown((previousState) => !previousState),
            className: "inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out",
            children: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", stroke: "currentColor", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: !showingNavigationDropdown ? "inline-flex" : "hidden",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M4 6h16M4 12h16M4 18h16"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: showingNavigationDropdown ? "inline-flex" : "hidden",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M6 18L18 6M6 6l12 12"
                }
              )
            ] })
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "pt-2 pb-3 space-y-1", children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("dashboard"), active: route().current("dashboard"), children: "Головна" }) }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 pb-1 border-t border-gray-200 dark:border-gray-600", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-4", children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium text-base text-gray-800 dark:text-gray-200", children: user.name }),
            /* @__PURE__ */ jsx("div", { className: "font-medium text-sm text-gray-500", children: user.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-1", children: [
            /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("profile.edit"), children: "Profile" }),
            /* @__PURE__ */ jsx(ResponsiveNavLink, { method: "post", href: route("logout"), as: "button", children: "Log Out" })
          ] })
        ] })
      ] })
    ] }),
    header && /* @__PURE__ */ jsx("header", { className: "bg-white dark:bg-gray-800 shadow", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8", children: header }) }),
    /* @__PURE__ */ jsx("main", { children })
  ] });
}
function DangerButton({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function SecondaryButton({ type = "button", className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Delete Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password", className: "sr-only" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ml-3", disabled: processing, children: "Delete Account" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Update Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Ensure your account is using a long, random password to stay secure." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "current_password", value: "Current Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.current_password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enterFrom: "opacity-0",
            leaveTo: "opacity-0",
            className: "transition ease-in-out",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({ mustVerifyEmail, status, className = "" }) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2 text-gray-800 dark:text-gray-200", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 font-medium text-sm text-green-600 dark:text-green-400", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enterFrom: "opacity-0",
            leaveTo: "opacity-0",
            className: "transition ease-in-out",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ auth, mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function Timetable({ auth, department, stream, group, pgroup }) {
  const [timetable, setTimetable] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(department);
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(stream);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(group);
  const [selectedPGroup, setSelectedPGroup] = useState(pgroup);
  const [week, setWeek] = useState(0);
  async function fetchDepartments() {
    const response = await axios.get("/api/v1/departments");
    setDepartments(response.data.data);
  }
  async function fetchStreams(departmentId) {
    const response = await axios.get(`/api/v1/streams/${departmentId}`);
    setStreams(response.data.data);
  }
  async function fetchGroups(streamId, groupId = null) {
    const response = await axios.get(
      `/api/v1/groups/${streamId}` + (groupId != null ? `/${groupId}` : ``)
    );
    if (response.data.data.groups) {
      setGroups(response.data.data.groups);
    }
    if (response.data.data.timetables) {
      setTimetable(response.data.data.timetables);
    }
  }
  useEffect(() => {
    fetchDepartments();
    fetchStreams(stream);
    fetchGroups(stream);
    fetchGroups(stream, group);
  }, [stream, group]);
  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    fetchStreams(value);
    setSelectedStream(0);
    setSelectedGroup(0);
    setSelectedPGroup(0);
  };
  const handleStreamChange = (value) => {
    setSelectedStream(value);
    fetchGroups(value);
    setSelectedGroup(0);
    setSelectedPGroup(0);
  };
  const handleGroupChange = (value) => {
    setSelectedGroup(value);
    fetchGroups(selectedStream, value);
    setSelectedPGroup(0);
  };
  const handlePGroupChange = (value) => {
    setSelectedPGroup(value);
  };
  const handleWeekChange = (value) => {
    setWeek(value);
  };
  const lessonStart = (value) => {
    var currentOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
    var convertedMinutes = 540 + (value - 1) * 110 + currentOffset;
    var hours = Math.floor(convertedMinutes / 60);
    var minutes = convertedMinutes % 60;
    return hours + ":" + (minutes == 0 ? "00" : minutes);
  };
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Timetable" }),
    /* @__PURE__ */ jsxs("div", { className: "pb-12 bg-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-6 p-6 text-gray-900 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-[190px] grid gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-xl", children: "Факультет" }),
          /* @__PURE__ */ jsx(
            Select,
            {
              options: departments,
              defaultValue: "Виберіть факультет",
              defaultSelectable: false,
              value: selectedDepartment,
              onChange: handleDepartmentChange
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-[190px] grid gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-xl", children: "Поток" }),
          selectedDepartment != 0 ? /* @__PURE__ */ jsx(
            Select,
            {
              options: streams,
              defaultValue: "Виберіть поток",
              defaultSelectable: false,
              value: selectedStream,
              onChange: handleStreamChange
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-[190px] grid gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-xl", children: "Група" }),
          selectedStream != 0 ? /* @__PURE__ */ jsx(
            Select,
            {
              options: groups,
              defaultValue: "Виберіть групу",
              defaultSelectable: false,
              value: selectedGroup,
              onChange: handleGroupChange
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-[190px] grid gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-xl", children: "Підгрупа" }),
          selectedGroup != 0 ? /* @__PURE__ */ jsx(
            Select,
            {
              options: ["Без підгруп", "Перша", "Друга"],
              defaultValue: "Без підгруп",
              defaultSelectable: false,
              value: selectedPGroup,
              onChange: handlePGroupChange
            }
          ) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid p-6 text-gray-900 w-full gap-12 max-xl:hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex content-center items-center gap-4 justify-center", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-xl", children: "Week 1" }),
          /* @__PURE__ */ jsx(
            InputSwitch,
            {
              initialValue: week,
              onChange: handleWeekChange
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-xl", children: "Week 2" })
        ] }),
        /* @__PURE__ */ jsxs("table", { className: "timetable", children: [
          /* @__PURE__ */ jsxs("thead", { children: [
            /* @__PURE__ */ jsx("th", { children: "Пн" }),
            /* @__PURE__ */ jsx("th", { children: "Вт" }),
            /* @__PURE__ */ jsx("th", { children: "Ср" }),
            /* @__PURE__ */ jsx("th", { children: "Чт" }),
            /* @__PURE__ */ jsx("th", { children: "Пт" }),
            /* @__PURE__ */ jsx("th", { children: "Сб" })
          ] }),
          /* @__PURE__ */ jsx("tbody", { children: [1, 2, 3, 4, 5, 6].map((lesson) => /* @__PURE__ */ jsx("tr", { children: [1, 2, 3, 4, 5, 6].map((day) => /* @__PURE__ */ jsxs("td", { children: [
            /* @__PURE__ */ jsx("div", { className: "time", children: lessonStart(lesson) }),
            timetable.map((entry, index) => /* @__PURE__ */ jsx("div", { children: (entry.pgroup == 0 || entry.pgroup == selectedPGroup) && entry.week == week + 1 && entry.day == day && entry.lesson == lesson ? /* @__PURE__ */ jsxs("div", { className: "card-default relative overflow-hidden", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `lesson-type type-${entry.type}`
                }
              ),
              /* @__PURE__ */ jsx("p", { children: entry.name })
            ] }) : null }, index))
          ] })) })) })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Timetable
}, Symbol.toStringTag, { value: "Module" }));
const quill_snow = "";
function QuillInput({ value, onChange }) {
  const handleChange = (content, delta, source, editor) => {
    onChange(content);
  };
  return /* @__PURE__ */ jsx("div", { className: "text-editor", children: /* @__PURE__ */ jsx(
    ReactQuill,
    {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["image", "video"],
          ["clean"]
        ]
      },
      formats: [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "link",
        "image",
        "video"
      ],
      value,
      onChange: handleChange
    }
  ) });
}
function FileInputDropdown() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };
  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };
  return /* @__PURE__ */ jsxs("div", { className: "file-input-dropdown", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "file-input-container",
        onDrop: handleDrop,
        onDragOver: (e) => e.preventDefault(),
        children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "file-input", className: "file-input-label", children: "Select or Drop Files" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              multiple: true,
              onChange: handleFileChange,
              id: "file-input",
              className: "file-input"
            }
          )
        ]
      }
    ),
    selectedFiles.length > 0 && /* @__PURE__ */ jsx("div", { className: "dropdown", children: selectedFiles.map((file, index) => /* @__PURE__ */ jsxs("div", { className: "file-item", children: [
      /* @__PURE__ */ jsx("span", { children: file.name }),
      /* @__PURE__ */ jsx("button", { onClick: () => removeFile(index), children: /* @__PURE__ */ jsx(
        "svg",
        {
          viewBox: "0 0 12 12",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx("path", { d: "M5.99932 7.41421L1.75668 11.6569L0.342465 10.2426L4.58511 6L0.342466 1.75736L1.75668 0.343143L5.99932 4.58579L10.242 0.343143L11.6562 1.75736L7.41354 6L11.6562 10.2426L10.242 11.6569L5.99932 7.41421Z" })
        }
      ) })
    ] }, index)) })
  ] });
}
function Welcome$1({ auth, laravelVersion, phpVersion, globalAlert }) {
  const [value, setValue] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const handleSwitchChange = (newValue) => {
    setIsEnabled(newValue);
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [selectedRadioOption, setSelectedRadioOption] = useState("option1");
  const handleRadioChange = (option) => {
    setSelectedRadioOption(option);
  };
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (newValue) => {
    setSelectedOption(newValue);
  };
  const showToast = () => {
    toast.info(globalAlert);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsx(ApplicationLogo, {}),
    /* @__PURE__ */ jsx(ApplicationLogo, { text: true }),
    /* @__PURE__ */ jsx(InputLabel, { required: true, value: "Text" }),
    /* @__PURE__ */ jsx(TextInput, { type: "text", placeholder: "input text" }),
    /* @__PURE__ */ jsx(InputLabel, { value: "Text disabled" }),
    /* @__PURE__ */ jsx(TextInput, { disabled: true, type: "text", placeholder: "input text" }),
    /* @__PURE__ */ jsx(InputLabel, { value: "Password" }),
    /* @__PURE__ */ jsx(TextInput, { type: "Password", placeholder: "Password" }),
    /* @__PURE__ */ jsx(InputError, { message: "error with code" }),
    /* @__PURE__ */ jsx(TextInput, { type: "time" }),
    /* @__PURE__ */ jsx(QuillInput, { value, onChange: setValue }),
    /* @__PURE__ */ jsx(
      InputSwitch,
      {
        label: "Active",
        initialValue: isEnabled,
        onChange: handleSwitchChange
      }
    ),
    /* @__PURE__ */ jsx(FileInputDropdown, {}),
    /* @__PURE__ */ jsx(PrimaryButton, { children: "Create" }),
    /* @__PURE__ */ jsx(PrimaryButton, { disabled: true, children: "Disabled" }),
    /* @__PURE__ */ jsx(
      Select,
      {
        options: [
          "Option 1",
          "Option 2",
          "Option 3",
          "Option 1",
          "Option 2",
          "Option 3",
          "Option 1",
          "Option 2",
          "Option 3",
          "Option 1",
          "Option 2",
          "Option 3",
          "Option 1",
          "Option 2",
          "Option 3"
        ],
        defaultValue: "Default Option",
        defaultSelectable: false,
        value: selectedOption,
        onChange: handleSelectChange
      }
    ),
    /* @__PURE__ */ jsx(
      Checkbox,
      {
        label: "Checkbox",
        checked: isChecked,
        onChange: handleCheckboxChange
      }
    ),
    /* @__PURE__ */ jsx(
      Checkbox,
      {
        disabled: true,
        label: "Checkbox",
        checked: isChecked,
        onChange: handleCheckboxChange
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        Radio,
        {
          label: "Option 1",
          checked: selectedRadioOption === "option1",
          onChange: () => handleRadioChange("option1")
        }
      ),
      /* @__PURE__ */ jsx(
        Radio,
        {
          label: "Option 2",
          checked: selectedRadioOption === "option2",
          onChange: () => handleRadioChange("option2")
        }
      ),
      /* @__PURE__ */ jsx(
        Radio,
        {
          label: "Option 3 (Disabled)",
          checked: selectedRadioOption === "option3",
          disabled: true
        }
      )
    ] }),
    /* @__PURE__ */ jsx(PrimaryButton, { onClick: showToast, children: "Show Toast" })
  ] });
}
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome$1
}, Symbol.toStringTag, { value: "Module" }));
function Welcome({ auth, laravelVersion, phpVersion }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs("div", { className: "relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center selection:bg-red-500 selection:text-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "welcome-layout", children: [
        /* @__PURE__ */ jsxs("div", { className: "welcome-container", children: [
          /* @__PURE__ */ jsx("h1", { children: "Вас вітає ROZKLAD NAU" }),
          /* @__PURE__ */ jsx("span", { children: 'Сайт "ROZKLAD NAU" надає можливість створювати та переглядати розклад занять. Головна функція сайту полягає в тому, щоб користувачі могли вводити інформацію про розклад університетських занять, вказуючи дні тижня, час проведення, групи, викладачів і предмети. Потім користувачі можуть переглядати цей розклад, долучати до нього свої групи, отримувати сповіщення про зміни в розкладі та багато іншого. Сайт допомагає студентам, викладачам і адміністрації навчальних закладів легко та зручно організовувати свій навчальний процес.' }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("a", { href: route("dashboard"), children: /* @__PURE__ */ jsxs(PrimaryButton, { children: [
              "Розклад",
              " ",
              /* @__PURE__ */ jsx("br", {}),
              "студента"
            ] }) }),
            /* @__PURE__ */ jsx("a", { href: route("dashboard"), children: /* @__PURE__ */ jsxs(PrimaryButton, { className: "bg-red-600 hover:bg-red-800", children: [
              "Розклад",
              " ",
              /* @__PURE__ */ jsx("br", {}),
              "викладача"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("img", { src: "storage/img/febb655.png" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sm:fixed sm:top-0 sm:left-0 sm:flex items-center space-x-4 p-6 ml-14", children: auth.user ? /* @__PURE__ */ jsx(
        Link,
        {
          href: route("dashboard"),
          className: "font-bold text-black hover:text-red-500",
          children: "Розклад"
        }
      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "font-bold text-black hover:text-red-500",
            children: "Логін"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("register"),
            className: "font-bold text-black hover:text-red-500",
            children: "Реєстрація"
          }
        )
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Admin/Config/Create.jsx": __vite_glob_0_0, "./Pages/Admin/Config/Edit.jsx": __vite_glob_0_1, "./Pages/Admin/Config/Index.jsx": __vite_glob_0_2, "./Pages/Admin/Dashboard.jsx": __vite_glob_0_3, "./Pages/Admin/Department/Create.jsx": __vite_glob_0_4, "./Pages/Admin/Department/Edit.jsx": __vite_glob_0_5, "./Pages/Admin/Department/Index.jsx": __vite_glob_0_6, "./Pages/Admin/Group/Create.jsx": __vite_glob_0_7, "./Pages/Admin/Group/Edit.jsx": __vite_glob_0_8, "./Pages/Admin/Group/Index.jsx": __vite_glob_0_9, "./Pages/Admin/Permission/Create.jsx": __vite_glob_0_10, "./Pages/Admin/Permission/Edit.jsx": __vite_glob_0_11, "./Pages/Admin/Permission/Index.jsx": __vite_glob_0_12, "./Pages/Admin/Role/Create.jsx": __vite_glob_0_13, "./Pages/Admin/Role/Edit.jsx": __vite_glob_0_14, "./Pages/Admin/Role/Index.jsx": __vite_glob_0_15, "./Pages/Admin/Stream/Create.jsx": __vite_glob_0_16, "./Pages/Admin/Stream/Edit.jsx": __vite_glob_0_17, "./Pages/Admin/Stream/Index.jsx": __vite_glob_0_18, "./Pages/Admin/Template/Create.jsx": __vite_glob_0_19, "./Pages/Admin/Template/Edit.jsx": __vite_glob_0_20, "./Pages/Admin/Template/Index.jsx": __vite_glob_0_21, "./Pages/Admin/Timetable/Create.jsx": __vite_glob_0_22, "./Pages/Admin/Timetable/Edit.jsx": __vite_glob_0_23, "./Pages/Admin/Timetable/Index.jsx": __vite_glob_0_24, "./Pages/Admin/User/Create.jsx": __vite_glob_0_25, "./Pages/Admin/User/Edit.jsx": __vite_glob_0_26, "./Pages/Admin/User/Index.jsx": __vite_glob_0_27, "./Pages/Auth/ConfirmPassword.jsx": __vite_glob_0_28, "./Pages/Auth/ForgotPassword.jsx": __vite_glob_0_29, "./Pages/Auth/Login.jsx": __vite_glob_0_30, "./Pages/Auth/Register.jsx": __vite_glob_0_31, "./Pages/Auth/ResetPassword.jsx": __vite_glob_0_32, "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_33, "./Pages/Profile/Edit.jsx": __vite_glob_0_34, "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_35, "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_36, "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_37, "./Pages/Timetable.jsx": __vite_glob_0_38, "./Pages/Welcome.jsx": __vite_glob_0_39, "./Pages/Welcome1.jsx": __vite_glob_0_40 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(App, { ...props }),
      /* @__PURE__ */ jsx(
        ToastContainer,
        {
          position: "top-right",
          autoClose: 5e3,
          hideProgressBar: false
        }
      )
    ] })
  })
);
