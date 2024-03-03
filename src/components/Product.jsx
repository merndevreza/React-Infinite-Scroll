
const Product = ({title,price,thumbnail}) => {
   return (
      <div className="p-4 w-[400px] inline-block m-3 bg-green-300 rounded">
         <img className="w-full h-[300px] object-cover" src={thumbnail} alt={title} />
         <h2>{title}</h2>
         <span>${price}</span>
         <button className="bg-orange-400 px-3 py-1 rounded ml-4">Buy now</button>
      </div>
   );
};

export default Product;