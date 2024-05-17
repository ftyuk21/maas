--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7
-- Dumped by pg_dump version 15.3

-- Started on 2024-05-17 15:06:41

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
-- Name: order; Type: TABLE; Schema: maas; Owner: postgres
--

CREATE TABLE maas."order" (
    order_id integer DEFAULT nextval('maas.auto_seq'::regclass) NOT NULL,
    pickup_time timestamp without time zone NOT NULL,
    destination character varying NOT NULL,
    start_location character varying NOT NULL,
    price_range_up integer NOT NULL,
    price_range_down integer NOT NULL,
    driver_id integer,
    customer_id integer NOT NULL,
    order_code character varying NOT NULL
);


ALTER TABLE maas."order" OWNER TO postgres;

--
-- TOC entry 3318 (class 0 OID 16399)
-- Dependencies: 216
-- Data for Name: order; Type: TABLE DATA; Schema: maas; Owner: postgres
--

INSERT INTO maas."order" VALUES (3, '2024-04-23 14:41:22.288', '台北', '台北', 200, 100, NULL, 1, 'ORD1234567');


--
-- TOC entry 3325 (class 0 OID 0)
-- Dependencies: 217
-- Name: auto_seq; Type: SEQUENCE SET; Schema: maas; Owner: postgres
--

SELECT pg_catalog.setval('maas.auto_seq', 3, true);


-- Completed on 2024-05-17 15:06:41

--
-- PostgreSQL database dump complete
--

