import React, { useState } from 'react';
import { Shirt, Calendar, Clock, ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';

const Laundry = () => {
  const [laundryCart, setLaundryCart] = useState({
    Shirt: 0,
    Pant: 0,
    Pullover: 0,
    Towel: 0,
  });
  const [laundryDate, setLaundryDate] = useState('');
  const [laundryTime, setLaundryTime] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateLaundryCart = (item, amount) => {
    setLaundryCart(prev => ({
      ...prev,
      [item]: Math.max(0, prev[item] + amount)
    }));
  };

  const handlePlaceOrder = () => {
    if (!laundryDate || !laundryTime) {
      alert("Please select both a date and a time for your laundry slot.");
      return;
    }
    
    const totalItems = Object.values(laundryCart).reduce((a, b) => a + b, 0);
    if (totalItems === 0) {
      alert("Please add at least one item to your cart.");
      return;
    }
    
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setLaundryCart({ Shirt: 0, Pant: 0, Pullover: 0, Towel: 0 });
      setLaundryDate('');
      setLaundryTime('');
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800">Laundry Management</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50/30 p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2 text-indigo-700 mb-2">
            <Calendar className="w-5 h-5" />
            <h3 className="text-lg font-bold">Book your slot and timing</h3>
          </div>
          <p className="text-sm text-gray-600">Select a convenient time for your laundry pickup and delivery.</p>
        </div>

        <div className="p-6">
          {orderPlaced ? (
             <div className="text-center py-16 animate-fade-in">
                <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h3>
                <p className="text-gray-600 max-w-sm mx-auto">Your laundry slot is confirmed for <span className="font-semibold text-gray-800">{laundryDate}</span> at <span className="font-semibold text-gray-800">{laundryTime}</span>.</p>
             </div>
          ) : (
            <>
              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" /> Select Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                    value={laundryDate}
                    onChange={(e) => setLaundryDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 mr-2 text-indigo-500" /> Select Time
                  </label>
                  <input 
                    type="time" 
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                    value={laundryTime}
                    onChange={(e) => setLaundryTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 text-gray-800 mb-4 border-b border-gray-100 pb-3">
                  <ShoppingCart className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-semibold text-lg">Add Items to Cart</h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.keys(laundryCart).map(item => (
                    <div key={item} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white hover:border-indigo-100 transition-all group">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Shirt className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-gray-700 text-lg">{item}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                        <button 
                          onClick={() => updateLaundryCart(item, -1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-bold text-gray-800">{laundryCart[item]}</span>
                        <button 
                          onClick={() => updateLaundryCart(item, 1)}
                          className="w-8 h-8 flex items-center justify-center text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-5 border-t border-gray-100">
                <button 
                  onClick={handlePlaceOrder}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Place Order</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Laundry;
