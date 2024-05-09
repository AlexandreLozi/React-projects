import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCartQuantity, getTotalPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getCartQuantity);

  const totalCartPrice = useSelector(getTotalPrice);

  if (!totalCartQuantity) return null;
  return (
    <div className=" bottom-0 left-0 right-0 flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 duration-300 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 transition-all sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
