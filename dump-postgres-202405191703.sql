PGDMP                         |            postgres    15.7    15.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Chinese (Traditional)_Taiwan.950';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3326                        2615    16398    maas    SCHEMA        CREATE SCHEMA maas;
    DROP SCHEMA maas;
                postgres    false            �            1259    16404    auto_seq    SEQUENCE     ~   CREATE SEQUENCE maas.auto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    DROP SEQUENCE maas.auto_seq;
       maas          postgres    false    7            �            1259    16399    orders    TABLE     �  CREATE TABLE maas.orders (
    order_id integer DEFAULT nextval('maas.auto_seq'::regclass) NOT NULL,
    pickup_time timestamp without time zone NOT NULL,
    destination character varying NOT NULL,
    start_location character varying NOT NULL,
    price_range_up integer NOT NULL,
    price_range_down integer NOT NULL,
    driver_id integer,
    customer_id integer NOT NULL,
    order_code character varying NOT NULL,
    status_code integer DEFAULT 2 NOT NULL
);
    DROP TABLE maas.orders;
       maas         heap    postgres    false    217    7                        0    0    COLUMN orders.status_code    COMMENT     i   COMMENT ON COLUMN maas.orders.status_code IS '1為已接單
2為未接單
99為訂單已完成結單';
          maas          postgres    false    216            �          0    16399    orders 
   TABLE DATA           �   COPY maas.orders (order_id, pickup_time, destination, start_location, price_range_up, price_range_down, driver_id, customer_id, order_code, status_code) FROM stdin;
    maas          postgres    false    216   E                  0    0    auto_seq    SEQUENCE SET     4   SELECT pg_catalog.setval('maas.auto_seq', 5, true);
          maas          postgres    false    217            �   x   x��̽�P�ڞ"�'�l������P c Q�Ke) �IW}��'��u�X�j���~�]��-��!\�J'p����^�-�6�	6��d�F��;�>�@�TV���<J%�sf���-4     