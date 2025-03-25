import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  CalendarIcon,
  UserGroupIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Phổ biến nhất", value: "popularity", current: true },
  { name: "Đánh giá cao nhất", value: "rating", current: false },
  { name: "Giá: Thấp đến cao", value: "price-asc", current: false },
  { name: "Giá: Cao đến thấp", value: "price-desc", current: false },
];

const filters = [
  {
    id: "loaiTau",
    name: "Loại tàu",
    options: [
      { value: "5sao", label: "Du thuyền 5 sao", checked: false },
      { value: "4sao", label: "Du thuyền 4 sao", checked: false },
      { value: "3sao", label: "Du thuyền 3 sao", checked: false },
      { value: "party", label: "Party Cruise", checked: false },
    ],
  },
  {
    id: "loaiPhong",
    name: "Loại phòng",
    options: [
      { value: "deluxe", label: "Deluxe", checked: false },
      { value: "suite", label: "Suite", checked: false },
      { value: "executive", label: "Executive", checked: false },
      { value: "family", label: "Family", checked: false },
    ],
  },
  {
    id: "khaiThac",
    name: "Khai thác",
    options: [
      { value: "2ngay1dem", label: "2 ngày 1 đêm", checked: false },
      { value: "3ngay2dem", label: "3 ngày 2 đêm", checked: false },
      { value: "thueTronu", label: "Thuê trọn tàu", checked: false },
    ],
  },
];

const cruises = [
  {
    id: 1,
    name: "Stellar of the Seas",
    price: "2,500,000 đ",
    rating: 4.8,
    reviewCount: 120,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y3J1aXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    ],
    description: "Du thuyền 5 sao với trải nghiệm sang trọng trên vịnh Hạ Long",
    features: ["5 sao", "Bể bơi", "Spa", "Nhà hàng", "Bar"],
    duration: "2 ngày 1 đêm",
    location: "Vịnh Hạ Long",
  },
  {
    id: 2,
    name: "Paradise Elegance",
    price: "1,800,000 đ",
    rating: 4.6,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3J1aXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    ],
    description: "Du thuyền hiện đại với dịch vụ chất lượng cao",
    features: ["4 sao", "Karaoke", "Câu mực đêm", "Chèo thuyền kayak"],
    duration: "3 ngày 2 đêm",
    location: "Vịnh Lan Hạ",
  },
  {
    id: 3,
    name: "Orchid Premium",
    price: "2,200,000 đ",
    rating: 4.7,
    reviewCount: 102,
    images: [
      "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3J1aXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    ],
    description: "Trải nghiệm đẳng cấp với dịch vụ 5 sao và ẩm thực đặc sắc",
    features: ["5 sao", "Jacuzzi", "Lớp nấu ăn", "Tập Tai Chi", "Hang động"],
    duration: "2 ngày 1 đêm",
    location: "Vịnh Hạ Long",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TimDuThuyen() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    destination: "Hạ Long",
    startDate: "",
    duration: "",
    guests: 2,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching with params:", searchParams);
    // Implement search logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white">
      {/* Hero section with search form */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 pb-32 pt-16">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Khám phá du thuyền đẳng cấp
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Trải nghiệm kỳ nghỉ sang trọng trên những du thuyền cao cấp nhất
              Việt Nam với dịch vụ đẳng cấp 5 sao
            </p>
          </div>

          {/* Search form */}
          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-4 shadow-xl">
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700"
                >
                  Điểm đến
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MapPinIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <select
                    id="destination"
                    name="destination"
                    value={searchParams.destination}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 pl-10 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="Hạ Long">Vịnh Hạ Long</option>
                    <option value="Lan Hạ">Vịnh Lan Hạ</option>
                    <option value="Bái Tử Long">Vịnh Bái Tử Long</option>
                    <option value="Nha Trang">Vịnh Nha Trang</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ngày khởi hành
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <CalendarIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={searchParams.startDate}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 pl-10 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Thời gian
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <select
                    id="duration"
                    name="duration"
                    value={searchParams.duration}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Chọn thời gian</option>
                    <option value="2ngay1dem">2 ngày 1 đêm</option>
                    <option value="3ngay2dem">3 ngày 2 đêm</option>
                    <option value="4ngay3dem">4 ngày 3 đêm</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="guests"
                  className="block text-sm font-medium text-gray-700"
                >
                  Số khách
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserGroupIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="number"
                    name="guests"
                    id="guests"
                    min="1"
                    value={searchParams.guests}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 pl-10 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Tìm kiếm du thuyền
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Bộ lọc
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Đóng</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Du thuyền
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sắp xếp
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Bộ lọc</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Danh sách du thuyền
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Bộ lọc</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Cruise list */}
              <div className="lg:col-span-3">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {cruises.map((cruise) => (
                    <div
                      key={cruise.id}
                      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
                    >
                      <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden bg-gray-200 lg:aspect-h-1 lg:aspect-w-2 h-48">
                        <img
                          src={cruise.images[0]}
                          alt={cruise.name}
                          className="h-full w-full object-cover object-center group-hover:opacity-90"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {cruise.name}
                          </h3>
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span className="ml-1 text-sm text-gray-600">
                              {cruise.rating}
                            </span>
                            <span className="mx-1 text-sm text-gray-600">
                              •
                            </span>
                            <span className="text-sm text-gray-600">
                              {cruise.reviewCount} đánh giá
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {cruise.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {cruise.features.map((feature, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <div className="text-gray-500 text-sm">
                              {cruise.duration}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {cruise.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Giá từ</p>
                            <p className="text-lg font-semibold text-indigo-600">
                              {cruise.price}
                            </p>
                          </div>
                        </div>
                        <button className="mt-4 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
