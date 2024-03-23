import { useMemo } from "react";

export default function Header({
  cart,
  removeForCar,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}) {
  let cartNotify = cart.length;
  const FREE_SHIPING = 400;
  //  state derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() =>
    cart.reduce((total, item) => total + item.quantity * item.price, 0, [cart])
  );
  const freeShipingCart =  FREE_SHIPING - cartTotal;

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  className="img-fluid"
                  src="/img/carrito.png"
                  alt="imagen carrito"
                />
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    background: "red",
                    borderRadius: "40%",
                    padding: "5px",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {cartNotify}
                </span>
              </div>

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt={guitar.name}
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">{guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => decreaseQuantity(guitar.id)}
                              >
                                -
                              </button>
                              {guitar.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => increaseQuantity(guitar.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => removeForCar(guitar.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar: <span className="fw-bold">{cartTotal} </span>
                    </p>

                    {cartTotal > 400 ? (
                      <p className="text-end" style={{ color: "red" }}>
                        Felicitaciones, tienes el beneficio de envío gratis{" "}
                        <span className="fw-bold"></span>
                      </p>
                    ) : (
                      <p className="text-end" style={{ color: "red" }}>
                        ¡Faltan $ {freeShipingCart} para que tu envío sea gratis! <span className="fw-bold"></span>
                      </p>
                    )}
                  </>
                )}

                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
