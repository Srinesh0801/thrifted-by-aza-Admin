import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Shirts = () => {
  const navigate = useNavigate();

  const categories = [
    { label: 'Striped Shirts', path: '/shirts/striped' },
    { label: 'Plain Shirts', path: '/shirts/plain' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Shirts Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <Card
            key={cat.label}
            className="cursor-pointer hover:shadow-lg"
            onClick={() => navigate(cat.path)}
          >
            <CardHeader>
              <CardTitle>{cat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              Manage all {cat.label.toLowerCase()} here.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shirts;
