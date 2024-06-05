--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7
-- Dumped by pg_dump version 15.3

-- Started on 2024-06-05 10:32:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 16398)
-- Name: maas; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA maas;


ALTER SCHEMA maas OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16404)
-- Name: auto_seq; Type: SEQUENCE; Schema: maas; Owner: postgres
--

CREATE SEQUENCE maas.auto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maas.auto_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16399)
-- Name: orders; Type: TABLE; Schema: maas; Owner: postgres
--

CREATE TABLE maas.orders (
    order_id integer DEFAULT nextval('maas.auto_seq'::regclass) NOT NULL,
    pickup_time timestamp without time zone NOT NULL,
    destination character varying NOT NULL,
    start_location character varying NOT NULL,
    price_range_up integer NOT NULL,
    price_range_down integer NOT NULL,
    driver_id integer,
    customer_id integer NOT NULL,
    order_code character varying NOT NULL,
    status_code integer DEFAULT 2 NOT NULL,
    drivercomment character varying,
    customercomment character varying,
    driverstar integer,
    customerstar integer
);


ALTER TABLE maas.orders OWNER TO postgres;

--
-- TOC entry 3326 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.order_id; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.order_id IS '訂單編號(跟其他資料做關聯用)';


--
-- TOC entry 3327 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.pickup_time; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.pickup_time IS '上車時間';


--
-- TOC entry 3328 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.destination; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.destination IS '目的地';


--
-- TOC entry 3329 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.start_location; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.start_location IS '上車地';


--
-- TOC entry 3330 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.price_range_up; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.price_range_up IS '價格上限';


--
-- TOC entry 3331 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.price_range_down; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.price_range_down IS '價格下限';


--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.driver_id; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.driver_id IS '接送者ID';


--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.customer_id; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.customer_id IS '乘車者ID';


--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.order_code; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.order_code IS '訂單編號(10碼)';


--
-- TOC entry 3335 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.status_code; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.status_code IS '1為已接單
2為未接單3接送者按下到達 
99為訂單已完成結單 88例外狀況';


--
-- TOC entry 3336 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.drivercomment; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.drivercomment IS '乘客對司機評論';


--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.customercomment; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.customercomment IS '司機對乘客評論';


--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.driverstar; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.driverstar IS '乘客對司機星等';


--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN orders.customerstar; Type: COMMENT; Schema: maas; Owner: postgres
--

COMMENT ON COLUMN maas.orders.customerstar IS '司機對乘客星等';


--
-- TOC entry 3319 (class 0 OID 16399)
-- Dependencies: 216
-- Data for Name: orders; Type: TABLE DATA; Schema: maas; Owner: postgres
--

COPY maas.orders (order_id, pickup_time, destination, start_location, price_range_up, price_range_down, driver_id, customer_id, order_code, status_code, drivercomment, customercomment, driverstar, customerstar) FROM stdin;
5	2024-05-17 15:25:24.719	string	string	0	0	2	1	ORD3699783	2	\N	\N	\N	\N
3	2024-04-23 14:41:22.288	台北	台北	200	100	22	11	ORD1234567	1	\N	\N	\N	\N
6	2024-05-22 09:03:10.17	string	string	0	0	22	111	ORD8245749	2	\N	\N	\N	\N
7	2024-05-22 09:03:10.17	string	string	0	0	2	11	ORD0341563	2	\N	\N	\N	\N
9	2024-05-22 10:30:56.647	string	string	0	0	22	111	ORD7191739	2	\N	\N	\N	\N
8	2024-05-22 10:02:37.65	string	string	0	0	22	11	ORD5497651	1	\N	\N	\N	\N
11	2024-05-22 10:30:56.647	string	string	0	0	2	111	ORD1999594	2	\N	\N	\N	\N
12	2024-05-22 10:39:26.733	string	string	0	0	22	1	ORD8103693	2	\N	\N	\N	\N
13	2024-05-27 14:16:48.777	string	string	0	0	0	0	ORD3203022	2	\N	\N	\N	\N
10	2024-05-22 10:30:56.647	string	string	0	0	2	11	ORD1001881	99	我覺得司機人很好，只是車上有煙味	\N	3	\N
4	2024-05-17 15:25:24.719	string	string	0	0	2	1	ORD5402869	99	司機人很好	\N	5	\N
\.


--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 217
-- Name: auto_seq; Type: SEQUENCE SET; Schema: maas; Owner: postgres
--

SELECT pg_catalog.setval('maas.auto_seq', 13, true);


-- Completed on 2024-06-05 10:32:16

--
-- PostgreSQL database dump complete
--

