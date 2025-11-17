import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { getAllProduct } from "~/redux/features/productSlice";
import { Spinner } from "~/components/ui/spinner";

const QuickViewModal = ({
  pId,
  open,
  onClose,
}: {
  pId: number | null;
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { loading, productData } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProduct({ token: "" }));
  }, []);
  const product = productData?.result?.find((prod) => prod.id === pId);
  if (!product) return null;

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center sm:items-center sm:justify-center p-4">
          {/* Mobile bottom drawer */}
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <DialogPanel className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 shadow-lg sm:hidden max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full rounded-md object-cover"
              />
            </DialogPanel>
          </Transition.Child>

          {/* Desktop centered modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="hidden sm:flex relative flex-col sm:flex-row bg-white rounded-lg p-6 shadow-xl w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <div className="flex-shrink-0 w-full">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QuickViewModal;
