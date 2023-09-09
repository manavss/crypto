/* eslint-disable react/prop-types */
import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useState } from "react";

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [searchterm, setSearchTerm] = useState("");
  const cryptos = cryptosList?.data?.coins;
  const searchedCrypto =
    searchterm.length > 2
      ? cryptos.filter((crypto) =>
          crypto.name.toLowerCase().includes(searchterm.toLowerCase())
        )
      : cryptos;

  if (isFetching) return <p>Loading...</p>;
  return (
    <>
      <div className="search-crypto">
        {!simplified && (
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        )}
      </div>
      <Row gutter={[32, 32]} className="crpto-card-container">
        {searchedCrypto &&
          searchedCrypto.map((crypto) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={crypto.uuid}
            >
              <Link to={`/crypto/${crypto.uuid}`}>
                <Card
                  title={`${crypto.rank} ${crypto.name}`}
                  extra={<img className="crypto-image" src={crypto.iconUrl} />}
                  hoverable
                >
                  <p>Price: {millify(crypto.price)}</p>
                  <p>Market Cap: {millify(crypto.marketCap)}</p>
                  <p>Daily Change: {millify(crypto.change)}</p>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
