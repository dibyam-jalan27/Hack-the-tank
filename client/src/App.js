import './App.css';
import Card1 from './UI/Card1';

function App() {
  return (
    <>
       <Card1 
        image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        title="Shoes!"
        body="If a dog chews shoes whose shoes does he choose?"
        primaryBadges={['NEW']}
        secondaryBadges={['Fashion', 'Products']}
        price="100"
      />
    </>
  );
}

export default App;
