import { useState } from 'react'
import { v4 } from 'uuid';
import './App.css'

type Drink = {
  id?: string,
  label: string,
  subLabel: string,
  price: number,
  deposit: number,
  color: string
}

const App = () => {
  const [cart, setCart] = useState<Drink[]>([])

  const getTotalAmount = () => {
    const total = cart.reduce((sum, item) => sum + item.price + item.deposit, 0)
    return <p className={total < 0 ? `text-red-500` : `text-black`}>{total} €</p>
  }

  const addItemToCart = (item: Drink) => {
    return () => {
      const uuid = v4();
      const newItem = {
        id: uuid,
        ...item
      }
      const newCart = [...cart, newItem];
      setCart(newCart);
    }
  }

  const removeItem = (id: string) => {
    return () => {
      const newCart= [...cart].filter((item) => item.id !== id);
      setCart(newCart);
    }
  }

  const drinks: Drink[] = [
    {
      label: 'Glühwein',
      subLabel: 'inkl. Pfand',
      price: 2,
      deposit: 2,
      color: 'bg-indigo-600'
    },
    {
      label: 'Glühwein + Schuss',
      subLabel: 'inkl. Pfand',
      price: 2.5,
      deposit: 2,
      color: 'bg-indigo-600'
    },
    {
      label: 'Alkoholfrei',
      subLabel: '',
      price: 2,
      deposit: 0,
      color: 'bg-indigo-600'
    },
    {
      label: 'Bier',
      subLabel: '',
      price: 2.5,
      deposit: 0,
      color: 'bg-indigo-600'
    },
    {
      label: 'Schnaps',
      subLabel: '',
      price: 1,
      deposit: 0,
      color: 'bg-indigo-600'
    },
    {
      label: 'Eierlikör',
      subLabel: '',
      price: 1.5,
      deposit: 0,
      color: 'bg-indigo-600'
    },
    {
      label: 'Pfand zurück',
      subLabel: '',
      price: -2,
      deposit: 0,
      color: 'bg-orange-500'
    },
  ]

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="w-full text-center p-4 mb-1">
        <div className="flex align-middle justify-center">
          {drinks.map((drink) => {
            return <button onClick={addItemToCart(drink)} className={`mr-4 rounded-md ${drink.color} p-6 sm:p-4 text-lg sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500`}>
              <p>{drink.label}</p>
              <p>{drink.subLabel}</p>
            </button>
          })}
        </div>
      </header>
      <main className="flex-1 overflow-y-scroll">
        <div>
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
            {cart.map((cartItem) => {
              return (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700">
                  <th scope="row" className="min-w-[250px] px-2 py-4 font-medium text-gray-900">
                    <p className="text-sm font-semibold text-gray-900">{cartItem.label}</p>
                    <p className="mt-1 text-xs text-gray-500">{cartItem.subLabel}</p>
                  </th>
                  <td className="px-6 py-4 text-right">
                    {cartItem.price + cartItem.deposit} €
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-sm bg-red-600 px-3 py-3 text-lg sm:text-sm font-semibold text-white" onClick={removeItem(cartItem.id as string)}>X</button>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="w-full text-center border-t border-grey">
        <table className="w-full">
          <tbody>
          {!!cart.length && (
            <>
              <tr className="bg-gray-200">
                <th scope="row" className="min-w-[250px] text-left px-2 py-4 font-medium text-black whitespace-nowrap">
                  <p className="font-bold text-lg">Gesamtpreis</p>
                </th>
                <td className="px-6 py-4 text-right font-bold text-lg">
                  {getTotalAmount()}
                </td>
                <td className="px-6 py-4 text-right">
                   <button className="rounded-sm bg-red-600 px-3 py-3 text-lg sm:text-sm font-semibold text-white" onClick={() => setCart([])}>RESET</button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      </footer>
    </div>
  )
}

export default App
