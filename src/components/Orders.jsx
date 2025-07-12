import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Calendar, Truck, User, Package, XCircle, CheckCircle, Search, Filter, ClipboardList, ListChecks } from 'lucide-react';

const mockOrders = [
  {
    id: 'ORD-001',
    product: 'Premium Office Chairs',
    customer: 'TechCorp Inc',
    quantity: 10,
    amount: 2990,
    status: 'Processing',
    date: '2024-06-01',
    address: 'San Francisco, Market St. 123',
  },
  {
    id: 'ORD-002',
    product: 'Standing Desk',
    customer: 'StartupHub',
    quantity: 3,
    amount: 1797,
    status: 'Done',
    date: '2024-05-28',
    address: 'San Jose, 1st Ave. 45',
  },
];

const mockRequests = [
  {
    id: 'REQ-001',
    requester: 'Ahmed Mohamed',
    company: 'Success Furniture Company',
    details: 'Request for 5 Premium Office Chairs, urgent delivery.',
    date: '2024-06-02',
    phone: '+20 100 123 4567',
    address: 'Cairo, Heliopolis, Al-Hegaz Street 45',
    status: 'pending',
  },
  {
    id: 'REQ-002',
    requester: 'Fatima Ahmed',
    company: 'Creative Trading Foundation',
    details: 'Request for 3 Standing Desks, standard delivery.',
    date: '2024-06-01',
    phone: '+20 101 234 5678',
    address: 'Giza, Mohandessin, Arab League Street 12',
    status: 'pending',
  },
];

const OandR = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter logic for orders and requests
  const filteredOrders = mockOrders.filter(order => {
    return (
      (statusFilter === 'all' || order.status.toLowerCase() === statusFilter) &&
      (order.product.toLowerCase().includes(search.toLowerCase()) || order.customer.toLowerCase().includes(search.toLowerCase()))
    );
  });
  const filteredRequests = mockRequests.filter(req => {
    return (
      (statusFilter === 'all' || req.status.toLowerCase() === statusFilter) &&
      (req.requester.toLowerCase().includes(search.toLowerCase()) || req.company.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Accept/Decline handlers for requests
  const [requests, setRequests] = useState(mockRequests);
  const handleAccept = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
  };
  const handleDecline = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'declined' } : r));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <Button variant={activeTab === 'orders' ? 'default' : 'outline'} onClick={() => setActiveTab('orders')}>
          <ClipboardList className="w-4 h-4 mr-2" /> Orders
        </Button>
        <Button variant={activeTab === 'requests' ? 'default' : 'outline'} onClick={() => setActiveTab('requests')}>
          <ListChecks className="w-4 h-4 mr-2" /> Requests
        </Button>
      </div>
      {/* Filter */}
      <Card className="border-2 border-[#457B9D]">
        <CardHeader className="bg-gradient-to-r from-[#457B9D] to-[#5A9BC8] text-white">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {activeTab === 'orders' ? 'Filter Orders' : 'Filter Requests'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <Input
              placeholder={activeTab === 'orders' ? 'Search by product or customer...' : 'Search by requester or company...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="status" className="mr-2">Status:</Label>
            <select
              id="status"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-[#A8DADC] rounded-lg px-3 py-2"
            >
              <option value="all">All</option>
              {activeTab === 'orders' ? (
                <>
                  <option value="processing">Processing</option>
                  <option value="done">Done</option>
                </>
              ) : (
                <>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                </>
              )}
            </select>
          </div>
        </CardContent>
      </Card>
      {/* Cards Section */}
      <div className="space-y-4">
        {activeTab === 'orders' ? (
          filteredOrders.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No orders found.</div>
          ) : (
            filteredOrders.map(order => (
              <Card key={order.id} className="border-2 border-[#457B9D]">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-[#457B9D]" />
                      <span className="font-semibold text-gray-900">{order.product}</span>
                      <Badge variant="outline" className="ml-2">{order.status}</Badge>
                    </div>
                    <div className="text-gray-600 text-sm mb-1">Order ID: {order.id}</div>
                    <div className="text-gray-600 text-sm mb-1">Customer: {order.customer}</div>
                    <div className="text-gray-600 text-sm mb-1">Quantity: {order.quantity}</div>
                    <div className="text-gray-600 text-sm mb-1">Address: {order.address}</div>
                    <div className="text-gray-600 text-sm mb-1">Date: {order.date}</div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    {order.status === 'Processing' && (
                      <Badge className="bg-yellow-100 text-yellow-700">Processing</Badge>
                    )}
                    {order.status === 'Done' && (
                      <Badge className="bg-green-100 text-green-700">Done</Badge>
                    )}
                    <div className="text-lg font-bold text-gray-900">${order.amount.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>
            ))
          )
        ) : (
          (requests.length === 0 || filteredRequests.length === 0) ? (
            <div className="text-center text-gray-500 py-12">No requests found.</div>
          ) : (
            filteredRequests.map(req => (
              <Card key={req.id} className="border-2 border-[#457B9D]">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-[#457B9D]" />
                      <span className="font-semibold text-gray-900">{req.requester}</span>
                      <Badge variant="outline" className="ml-2">{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</Badge>
                    </div>
                    <div className="text-gray-600 text-sm mb-1">Request ID: {req.id}</div>
                    <div className="text-gray-600 text-sm mb-1">Company: {req.company}</div>
                    <div className="text-gray-600 text-sm mb-1">Phone: {req.phone}</div>
                    <div className="text-gray-600 text-sm mb-1">Address: {req.address}</div>
                    <div className="text-gray-600 text-sm mb-1">Date: {req.date}</div>
                    <div className="text-gray-700 text-base mt-2">{req.details}</div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    {req.status === 'pending' && (
                      <>
                        <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50" onClick={() => handleAccept(req.id)}>
                          <CheckCircle className="w-4 h-4 mr-1" /> Accept
                        </Button>
                        <Button variant="outline" className="border-red-600 text-red-700 hover:bg-red-50" onClick={() => handleDecline(req.id)}>
                          <XCircle className="w-4 h-4 mr-1" /> Decline
                        </Button>
                      </>
                    )}
                    {req.status === 'accepted' && (
                      <Badge className="bg-green-100 text-green-700">Accepted</Badge>
                    )}
                    {req.status === 'declined' && (
                      <Badge className="bg-red-100 text-red-700">Declined</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default OandR; 