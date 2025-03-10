PGDMP                      }            Tanami    17.2    17.2 q    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    34098    Tanami    DATABASE     �   CREATE DATABASE "Tanami" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Tanami";
                     postgres    false            �            1259    34277    admins    TABLE     m   CREATE TABLE public.admins (
    email text NOT NULL,
    password text NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.admins;
       public         heap r       postgres    false            �            1259    34405    admins_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.admins_id_seq;
       public               postgres    false    234            �           0    0    admins_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;
          public               postgres    false    244            �            1259    34129    agents    TABLE       CREATE TABLE public.agents (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image text
);
    DROP TABLE public.agents;
       public         heap r       postgres    false            �            1259    34128    agents_id_seq    SEQUENCE     �   CREATE SEQUENCE public.agents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.agents_id_seq;
       public               postgres    false    222            �           0    0    agents_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.agents_id_seq OWNED BY public.agents.id;
          public               postgres    false    221            �            1259    34246    bookings    TABLE     �  CREATE TABLE public.bookings (
    id integer NOT NULL,
    property_id integer,
    client_id integer,
    agent_id integer,
    booking_date timestamp without time zone DEFAULT now(),
    status character varying(50),
    CONSTRAINT bookings_status_check CHECK (((status)::text = ANY ((ARRAY['Confirmed'::character varying, 'Cancelled'::character varying, 'Pending'::character varying])::text[])))
);
    DROP TABLE public.bookings;
       public         heap r       postgres    false            �            1259    34245    bookings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.bookings_id_seq;
       public               postgres    false    232            �           0    0    bookings_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;
          public               postgres    false    231            �            1259    34141    clients    TABLE     /  CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(50) NOT NULL,
    interested_in integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    nationality text
);
    DROP TABLE public.clients;
       public         heap r       postgres    false            �            1259    34140    clients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.clients_id_seq;
       public               postgres    false    224            �           0    0    clients_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;
          public               postgres    false    223            �            1259    34100    communities    TABLE     �   CREATE TABLE public.communities (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    location text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image text
);
    DROP TABLE public.communities;
       public         heap r       postgres    false            �            1259    34099    communities_id_seq    SEQUENCE     �   CREATE SEQUENCE public.communities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.communities_id_seq;
       public               postgres    false    218            �           0    0    communities_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.communities_id_seq OWNED BY public.communities.id;
          public               postgres    false    217            �            1259    34223 
   developers    TABLE     �   CREATE TABLE public.developers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    contact_info text,
    website character varying(255),
    description text,
    logo text,
    banner text
);
    DROP TABLE public.developers;
       public         heap r       postgres    false            �            1259    34222    developers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.developers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.developers_id_seq;
       public               postgres    false    228            �           0    0    developers_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.developers_id_seq OWNED BY public.developers.id;
          public               postgres    false    227            �            1259    34320    features    TABLE     n   CREATE TABLE public.features (
    id integer NOT NULL,
    name text,
    description text,
    icon text
);
    DROP TABLE public.features;
       public         heap r       postgres    false            �            1259    34319    features_id_seq    SEQUENCE     �   CREATE SEQUENCE public.features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.features_id_seq;
       public               postgres    false    239            �           0    0    features_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.features_id_seq OWNED BY public.features.id;
          public               postgres    false    238            �            1259    34396 
   getintouch    TABLE     �   CREATE TABLE public.getintouch (
    id integer NOT NULL,
    name text,
    email text,
    phone_code text,
    phone_number text,
    identity text,
    message text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.getintouch;
       public         heap r       postgres    false            �            1259    34395    getintouch_id_seq    SEQUENCE     �   CREATE SEQUENCE public.getintouch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.getintouch_id_seq;
       public               postgres    false    243            �           0    0    getintouch_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.getintouch_id_seq OWNED BY public.getintouch.id;
          public               postgres    false    242            �            1259    34301 	   locations    TABLE     �   CREATE TABLE public.locations (
    id integer NOT NULL,
    name text,
    area text,
    density text,
    population text,
    description text,
    state text
);
    DROP TABLE public.locations;
       public         heap r       postgres    false            �            1259    34300    locations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.locations_id_seq;
       public               postgres    false    237            �           0    0    locations_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;
          public               postgres    false    236            �            1259    34269    news_articles    TABLE     �   CREATE TABLE public.news_articles (
    title text NOT NULL,
    body text NOT NULL,
    image text,
    date text DEFAULT CURRENT_TIMESTAMP NOT NULL,
    location text NOT NULL,
    id integer NOT NULL
);
 !   DROP TABLE public.news_articles;
       public         heap r       postgres    false            �            1259    34284    news_articles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.news_articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.news_articles_id_seq;
       public               postgres    false    233            �           0    0    news_articles_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.news_articles_id_seq OWNED BY public.news_articles.id;
          public               postgres    false    235            �            1259    34232    payments    TABLE     �  CREATE TABLE public.payments (
    id integer NOT NULL,
    transaction_id integer,
    amount numeric(15,2) NOT NULL,
    payment_date timestamp without time zone DEFAULT now(),
    payment_method character varying(50),
    CONSTRAINT payments_payment_method_check CHECK (((payment_method)::text = ANY ((ARRAY['Credit Card'::character varying, 'Bank Transfer'::character varying, 'Cash'::character varying])::text[])))
);
    DROP TABLE public.payments;
       public         heap r       postgres    false            �            1259    34231    payments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.payments_id_seq;
       public               postgres    false    230            �           0    0    payments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;
          public               postgres    false    229            �            1259    34110 
   properties    TABLE       CREATE TABLE public.properties (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    price text NOT NULL,
    type character varying(50),
    status character varying(50),
    bedrooms integer,
    bathrooms integer,
    size text,
    community_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    location text,
    features text,
    payment_plan text,
    handover text,
    features_description text,
    "floorPlanPDF" text,
    "floorPlanDescription" text,
    payment_plan_description text,
    location_map text,
    location_description text,
    nearby_places text,
    master_plan_map text,
    master_plan_description text,
    images text,
    developer_id text,
    "paymentplanPDF" text,
    state text
);
    DROP TABLE public.properties;
       public         heap r       postgres    false            �            1259    34109    properties_id_seq    SEQUENCE     �   CREATE SEQUENCE public.properties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.properties_id_seq;
       public               postgres    false    220            �           0    0    properties_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.properties_id_seq OWNED BY public.properties.id;
          public               postgres    false    219            �            1259    34347    states    TABLE     W   CREATE TABLE public.states (
    id integer NOT NULL,
    name text,
    image text
);
    DROP TABLE public.states;
       public         heap r       postgres    false            �            1259    34346    states_id_seq    SEQUENCE     �   CREATE SEQUENCE public.states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.states_id_seq;
       public               postgres    false    241            �           0    0    states_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.states_id_seq OWNED BY public.states.id;
          public               postgres    false    240            �            1259    34158    transactions    TABLE     �  CREATE TABLE public.transactions (
    id integer NOT NULL,
    client_id integer,
    property_id integer,
    agent_id integer,
    transaction_type character varying(50),
    total_price numeric(12,2) NOT NULL,
    payment_status character varying(50),
    transaction_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT transactions_payment_status_check CHECK (((payment_status)::text = ANY ((ARRAY['Pending'::character varying, 'Completed'::character varying, 'Canceled'::character varying])::text[]))),
    CONSTRAINT transactions_transaction_type_check CHECK (((transaction_type)::text = ANY ((ARRAY['Sale'::character varying, 'Rent'::character varying])::text[])))
);
     DROP TABLE public.transactions;
       public         heap r       postgres    false            �            1259    34157    transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public               postgres    false    226            �           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public               postgres    false    225            �           2604    34406 	   admins id    DEFAULT     f   ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);
 8   ALTER TABLE public.admins ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    244    234            �           2604    34132 	   agents id    DEFAULT     f   ALTER TABLE ONLY public.agents ALTER COLUMN id SET DEFAULT nextval('public.agents_id_seq'::regclass);
 8   ALTER TABLE public.agents ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221    222            �           2604    34249    bookings id    DEFAULT     j   ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);
 :   ALTER TABLE public.bookings ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    231    232    232            �           2604    34144 
   clients id    DEFAULT     h   ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);
 9   ALTER TABLE public.clients ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    224    224            �           2604    34103    communities id    DEFAULT     p   ALTER TABLE ONLY public.communities ALTER COLUMN id SET DEFAULT nextval('public.communities_id_seq'::regclass);
 =   ALTER TABLE public.communities ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �           2604    34226    developers id    DEFAULT     n   ALTER TABLE ONLY public.developers ALTER COLUMN id SET DEFAULT nextval('public.developers_id_seq'::regclass);
 <   ALTER TABLE public.developers ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    228    227    228            �           2604    34323    features id    DEFAULT     j   ALTER TABLE ONLY public.features ALTER COLUMN id SET DEFAULT nextval('public.features_id_seq'::regclass);
 :   ALTER TABLE public.features ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    239    238    239            �           2604    34399    getintouch id    DEFAULT     n   ALTER TABLE ONLY public.getintouch ALTER COLUMN id SET DEFAULT nextval('public.getintouch_id_seq'::regclass);
 <   ALTER TABLE public.getintouch ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    242    243    243            �           2604    34304    locations id    DEFAULT     l   ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);
 ;   ALTER TABLE public.locations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    236    237    237            �           2604    34285    news_articles id    DEFAULT     t   ALTER TABLE ONLY public.news_articles ALTER COLUMN id SET DEFAULT nextval('public.news_articles_id_seq'::regclass);
 ?   ALTER TABLE public.news_articles ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    235    233            �           2604    34235    payments id    DEFAULT     j   ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);
 :   ALTER TABLE public.payments ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    230    229    230            �           2604    34113    properties id    DEFAULT     n   ALTER TABLE ONLY public.properties ALTER COLUMN id SET DEFAULT nextval('public.properties_id_seq'::regclass);
 <   ALTER TABLE public.properties ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            �           2604    34350 	   states id    DEFAULT     f   ALTER TABLE ONLY public.states ALTER COLUMN id SET DEFAULT nextval('public.states_id_seq'::regclass);
 8   ALTER TABLE public.states ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    240    241    241            �           2604    34161    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225    226            �          0    34277    admins 
   TABLE DATA           5   COPY public.admins (email, password, id) FROM stdin;
    public               postgres    false    234   �       �          0    34129    agents 
   TABLE DATA           K   COPY public.agents (id, name, email, phone, created_at, image) FROM stdin;
    public               postgres    false    222   =�       �          0    34246    bookings 
   TABLE DATA           ^   COPY public.bookings (id, property_id, client_id, agent_id, booking_date, status) FROM stdin;
    public               postgres    false    232   Z�       �          0    34141    clients 
   TABLE DATA           a   COPY public.clients (id, name, email, phone, interested_in, created_at, nationality) FROM stdin;
    public               postgres    false    224   w�       �          0    34100    communities 
   TABLE DATA           Y   COPY public.communities (id, name, location, description, created_at, image) FROM stdin;
    public               postgres    false    218   B�       �          0    34223 
   developers 
   TABLE DATA           `   COPY public.developers (id, name, contact_info, website, description, logo, banner) FROM stdin;
    public               postgres    false    228   N�       �          0    34320    features 
   TABLE DATA           ?   COPY public.features (id, name, description, icon) FROM stdin;
    public               postgres    false    239   �       �          0    34396 
   getintouch 
   TABLE DATA           n   COPY public.getintouch (id, name, email, phone_code, phone_number, identity, message, created_at) FROM stdin;
    public               postgres    false    243   �       �          0    34301 	   locations 
   TABLE DATA           \   COPY public.locations (id, name, area, density, population, description, state) FROM stdin;
    public               postgres    false    237   �       �          0    34269    news_articles 
   TABLE DATA           O   COPY public.news_articles (title, body, image, date, location, id) FROM stdin;
    public               postgres    false    233   2�       �          0    34232    payments 
   TABLE DATA           \   COPY public.payments (id, transaction_id, amount, payment_date, payment_method) FROM stdin;
    public               postgres    false    230   ;�       �          0    34110 
   properties 
   TABLE DATA           �  COPY public.properties (id, title, description, price, type, status, bedrooms, bathrooms, size, community_id, created_at, location, features, payment_plan, handover, features_description, "floorPlanPDF", "floorPlanDescription", payment_plan_description, location_map, location_description, nearby_places, master_plan_map, master_plan_description, images, developer_id, "paymentplanPDF", state) FROM stdin;
    public               postgres    false    220   X�       �          0    34347    states 
   TABLE DATA           1   COPY public.states (id, name, image) FROM stdin;
    public               postgres    false    241   ��       �          0    34158    transactions 
   TABLE DATA           �   COPY public.transactions (id, client_id, property_id, agent_id, transaction_type, total_price, payment_status, transaction_date) FROM stdin;
    public               postgres    false    226   v�       �           0    0    admins_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.admins_id_seq', 1, true);
          public               postgres    false    244            �           0    0    agents_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.agents_id_seq', 11, true);
          public               postgres    false    221            �           0    0    bookings_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.bookings_id_seq', 12, true);
          public               postgres    false    231            �           0    0    clients_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.clients_id_seq', 4, true);
          public               postgres    false    223            �           0    0    communities_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.communities_id_seq', 13, true);
          public               postgres    false    217            �           0    0    developers_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.developers_id_seq', 23, true);
          public               postgres    false    227            �           0    0    features_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.features_id_seq', 55, true);
          public               postgres    false    238            �           0    0    getintouch_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.getintouch_id_seq', 4, true);
          public               postgres    false    242            �           0    0    locations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.locations_id_seq', 43, true);
          public               postgres    false    236            �           0    0    news_articles_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.news_articles_id_seq', 9, true);
          public               postgres    false    235            �           0    0    payments_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.payments_id_seq', 8, true);
          public               postgres    false    229            �           0    0    properties_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.properties_id_seq', 45, true);
          public               postgres    false    219            �           0    0    states_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.states_id_seq', 8, true);
          public               postgres    false    240            �           0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 12, true);
          public               postgres    false    225            �           2606    34413    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public                 postgres    false    234            �           2606    34139    agents agents_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public.agents DROP CONSTRAINT agents_email_key;
       public                 postgres    false    222            �           2606    34137    agents agents_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.agents DROP CONSTRAINT agents_pkey;
       public                 postgres    false    222            �           2606    34253    bookings bookings_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_pkey;
       public                 postgres    false    232            �           2606    34151    clients clients_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_email_key;
       public                 postgres    false    224            �           2606    34149    clients clients_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_pkey;
       public                 postgres    false    224            �           2606    34108    communities communities_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.communities
    ADD CONSTRAINT communities_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.communities DROP CONSTRAINT communities_pkey;
       public                 postgres    false    218            �           2606    34230    developers developers_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.developers
    ADD CONSTRAINT developers_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.developers DROP CONSTRAINT developers_pkey;
       public                 postgres    false    228            �           2606    34327    features features_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.features
    ADD CONSTRAINT features_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.features DROP CONSTRAINT features_pkey;
       public                 postgres    false    239                       2606    34404    getintouch getintouch_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.getintouch
    ADD CONSTRAINT getintouch_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.getintouch DROP CONSTRAINT getintouch_pkey;
       public                 postgres    false    243            �           2606    34308    locations locations_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.locations DROP CONSTRAINT locations_pkey;
       public                 postgres    false    237            �           2606    34292     news_articles news_articles_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.news_articles
    ADD CONSTRAINT news_articles_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.news_articles DROP CONSTRAINT news_articles_pkey;
       public                 postgres    false    233            �           2606    34239    payments payments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public                 postgres    false    230            �           2606    34122    properties properties_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.properties DROP CONSTRAINT properties_pkey;
       public                 postgres    false    220            �           2606    34354    states states_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.states DROP CONSTRAINT states_pkey;
       public                 postgres    false    241            �           2606    34166    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public                 postgres    false    226                       2606    34264    bookings bookings_agent_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES public.agents(id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_agent_id_fkey;
       public               postgres    false    4841    232    222            	           2606    34259     bookings bookings_client_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_client_id_fkey;
       public               postgres    false    232    4845    224            
           2606    34254 "   bookings bookings_property_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_property_id_fkey;
       public               postgres    false    232    4837    220                       2606    34152 "   clients clients_interested_in_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_interested_in_fkey FOREIGN KEY (interested_in) REFERENCES public.properties(id) ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_interested_in_fkey;
       public               postgres    false    224    4837    220                       2606    34240 %   payments payments_transaction_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_transaction_id_fkey;
       public               postgres    false    230    4847    226                       2606    34123 '   properties properties_community_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_community_id_fkey FOREIGN KEY (community_id) REFERENCES public.communities(id) ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public.properties DROP CONSTRAINT properties_community_id_fkey;
       public               postgres    false    218    220    4835                       2606    34177 '   transactions transactions_agent_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES public.agents(id) ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_agent_id_fkey;
       public               postgres    false    222    4841    226                       2606    34167 (   transactions transactions_client_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_client_id_fkey;
       public               postgres    false    226    4845    224                       2606    34172 *   transactions transactions_property_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_property_id_fkey;
       public               postgres    false    4837    220    226            �      x�KL���sH�z����`�!W� ��      �      x������ � �      �      x������ � �      �   �   x��ν�0����*����0���..,G��`h/_taa���<9�uQ�m衫Zߵ�f��7����XVtVB*m�d�r�O �4��H��W�,Qil�<	g챢��ijt|H6�r&��$6ZI�$?����n�nh��]Þ�BJ���H�D��9��`�ɂ;���\o=��%9#�|��a(      �   �  x�uXM�7=ۿ����,Ec���G���A����Pݔ�v�C�G#����/�d�+�[��=5�⫪W��^.����L��>=y=�}�Rݙ.�Դ���l��w�^��l�RcTctH���K[�F��+��T3����+[V�Zm���\�OJ��U4ၫ<^];#�� �gl�L�t��×ʇ��ձ��F��6�ڠ�\�/�eST5�����b�Tg���@��������Nw��_�	������8�p8&&Uin��b�4�\N�9.'��£���� v��[���� 2~��zWcwjt�.����NЮ?v���s����d:D��u��ɫ��������Q�ۇ{ug�i�|g�_��z��L�1��#y���Ꝯ�4Xs���V`qwR;��Ks��c���zo��0,Z�|��!��O�窵�ѩ���joL��|�z*$!�gt����.��d��j�� ��v��Γ��1��0�i��sC,��i��Ȋ���z<:C���g4³�}��!ꃙ2�q�g|���Q�J}��_�eN��n��j�v�����T��2I�ۚs���U5�v�6L�D'���b���u��.�2��V�DHrNjHQ:Ӿw�H0A�����^�➎,�Xw4wN� ���)���;��,�4�W]��+{����L�躄4�������kC�)��$�4�Z�67���j�V�������f�^��=Yn�X|�^?߬��/���r�%٬�XN���d8���@�bd��o��P�X�H������c��#8ϳT,�A���=����]�rm���\�2���B�3HJԶ�6�^B�@?�6��m��l'f�2�6 !=̟���<ږ���<0ji�ԅcq�f���;��8PG�.w�'��R]����Pԃ(8��F��ht$ӈ��|_���qD�.E�@9#��AD
3�>	тt:7���ґ��%(g	b���@�Z"�ߡ���ا�k;��T.���Zܳ~�Ds�!耶�w�b�(��-K7O�;?�����)w/s�B�[�k󤎚���g��ew�� |���G90���%`����6�b����8���C03��ٕjK��*��'7����~󝸞��ʡ�@4�E�M��Q���ѣ��*��ޅ8e�+� ��<wv�/Te���n��vR���-z�����k�۶��o>*��,��dj��'.�]��xVg8��0��5����m��f^X\	��pwԧ�3��Mn���	�1�	��A���=�Z�K�����IL��D>��
O��p�N����ˊ�� qI������u��pn�YKA��K��Y�;F�_���|�x�Z�A���3�`W��L!�tJ	�B�P톝mhq�J^@J �dE�s/.z��W`m`�#y�;�m^,���j�}��ȱ�r�]�=ˤR?�
Q��	����#������񐑪�mO5�G8d(���.�f*��޴Z�k�ޚX�a@R�$��pi]��]��9��M8��j�],`�&ɘu�I�z�`�;�$yN�q��ZKis�)W�(J��dT��<kh�GZ\�
d�M#��$��M�hD� �����@�Xr=��2�2�T$C\�3P�C�������Xih��gO`��ƈ\�A��v����tw/�+u�n(m(� R~,:��� l�Ub�)_��A5��\H{κ�s7{gꃩ/����F��\�l���I��89\P
�.v�q���ަXG�b����(?���/�d����&�b_�G�k<f�;J�9�q9���GE����W�'n�A�2��}��S0e�s FEV��<��E"����r��!5f�YE-U���g�KM��,�Ao�rg��[xy��/7�,�:�~pe�,��˲�<�z�eS�-o�J�<�Z���,ɷ6�8͵���P�=��4{��C�P��L���Y"U:G��#�s���9��
������/�p�Őu�q!kd�L=x<�O�
Ѝ(��c"޳�Ĩ���=�ZL������ruA�Ԩ�Y)P��e�>H��W�$Exm{�
�<��N���%���SH�h�IV�D��z���+�����4���h�%�IA�0���C(�^���8}�^ukKۍ(���l�]��X�G��ë;�Hq]�2�WH 2v��B%�����B
ץt�H  ����7NL|�$lr�}�|�j�}�\o��۟���*כ��JZ���ӧO�Za�f      �   �  x��W�z�6>�O��UI�"���K��M�%i}�$G"b`�XQO}��^��� �H/=�=X��,���h��\*��eJ\�iے��W�X�������|q2k����t���=Z�M~!'��_wc�zv�^�ut���|r�+��{ǖ�"�_���gg�{��$�Z�'ϵF�����Қ ���_��w��6��ߐ�D"�x�kq�<轐Al��M�4�F�=�5�
��g僼%a7B�[28�/w�OV�r����
����R
-ݖDm�'������)�E��-O���胀�Zz�X���w|+K����~Y���lȇ���g���߅���Ơ�F{Q�W[C.YB�%1 �Q:��\mz�%����Qe:b�����K��D����@���^��n���}������
T��T�_=�W�>��jJ�����z%�$�g�Xe $}C\��#Q9uGFĤ�J�s��IC�3r�ާ�z� ��FX/0�@�O|I�C@�#���FmccF*e����v�J������~j[�z6�K�F̭r4K�_�N֫�ճ�C9�\��[y[�C�������w��DX�dg�����O/4Ɋ!�$�ݝ���T�\�� 7:6��=�*�g,�Kbc]�/�1,�=�#�XgD�%R>!�M��ki*��U��8囙�ܺH�Cq���s��_��)u��K݈ױ�AYO�M7��+���O�:�jx��>!�Mi-�4����v���Զ>�y!]E�(_Z.�At��O�}�f*n�di��Nn
��xe�y�ʲׄF�W��y++����B΄�d�tP��D�A�0]��m����sQ*m�PF�%�-�x��i��`��r=O�Z�-WFϬ�A���"�V�0�[4
�=!5��2e��K�$�j	U1��l�<[��'��_N.>\\_so�NV� �C��{^"�o���&t<��g����s���W~�x΍AP���i�@��<�!����GJǻ�#�Ԫ!��m��nO�Y②����B+_�[n�<�������T���q/�.F~���j����d��]��K�b|j��&'��.l�V��S8ukn�}��Ve��u�O,��/d�;�����ʮ<��N`ޥ�+'�)C�s�+C@c	@۲{̯.!���
�6܁�a�U��3q�N` 3����G��8{�N�*�N����%�[Cݲ�K�)^8�<l��X��p|���ݡo����޼H��st�N�:ƈrȥ�y�
`��/��D��ml5y����տ�]�G"�8&7�D�6?��K9gyq~����,���� �F��RD�DNC�
�L��\�P:����2L��T������0�}-��ԶK�vt��4W\l� �Xy'Ky�GU��Ap��J�Q^�E�]��ɛ`�~�f��3�y���MkGZ�f���i�Nţ4%⥨�ـ(���t�~"od9�Y���A�*g��"nc��7-w��0D�6�B8�#;O���S2�E�Ა�@����b���*�)����
��X=���@��#�}j������Nm�8��>0�?y�ȫ���=S{��w�o9��������cD����������'M�t�<�\�F�O����Ń�,O�*�<��S-g2�|�Ə���|h�$7��ϳ������#�      �   �  x��XMw9<�B7.�ŉ��1q`7l��.�F��h�A�8�_����=�o��Ψ��U]�ä�?��Uf��վ�PK���:��?yP�0nj��򽓌���*(�_W��~q\��Zo�͏^u��ٻM��xޫZ��W�`Y˕	��8kpOh6L���a�e�;���P[�;?���\�@ �Nr_�;.�g5�WR��
ŵ�EO���<)S�S�V�^��7;��5W�/�d�K-E`¶mobrvEǐB�{�}H�V��כx�W�;�x2�u���S��j-)�'<�yB�hg�w�>~��IiXʯzpv�(礑�c��5m,��l)ܐ���x��9�K�;6Ս���F2ϗ2�T:Ii�%W5���a.�Y�t�H^�X����&��Q՞���9�C�d�V����_���9�*H�*���(�.p�#����r��NQ�K�Z��{G���&oH�����[.��Ei�K�H���=I�=�FV�ݦ=�T3�5#���~5F���ܿ�%[�F	�ɘ�%�J��Vu��!EU�|R��i��3#e�*��vR}�Z��AMw�v�m%���@�ki�4"��dZ�W��h��&v����N,�n��+�K�L`-
C����BԢ�HJ�MN�;�X$}��ެJ�|�����d94<��@
	g�{�A>J�EJ��I!��H����=�� �ڥЮ�s�%7�C��!n	��>I\�ټ�]�{����Ȱ8"1�;����qb�/ �w�:y[����X���P���FO�T!�s�6���
\�s�2��t٢�T��4�1/8ՑX�GŒ�wH�݄���4�ͮ�k��p��ȠD�jR�E��2�w+���;OJ*.^+�^!v�c��������YW2��L�kD\��ۚ�Nfm��9���3��G�s��U��(��-�����T����&�i��]���m���?;.�<4��Uϗ�����C�f�/�k�}+N�S9ۛR3{D�jϼ.�ef�p6��w��eȟ��<A�+���]
���y�Sn�A�o=	�:D��'g��Wm��S�cl��`ByK��+�t��$U�V�%��ˣ7�R����q�ȋ��.�I�}���O�I5�I�|�٤�Ӭ�s*@B�Q�q�͆H�q.�l���������.������3�S�mn��6���`*{����x\��@��.xp:�����G�ہ��/nK4�Ip�Q]�:BŝhW�U\��BМ��	�lT[��b���*O!�#7����CKE��V���lŘ������
<�'�$��d+�6����;�hM4�Eك/F�Z	r='fQ�*9\Tn�`C��Du�{�5ߑ(��'��_f�ߊ�� �nB��ZR %m֣���>��]c�qJ<�!�}I�>���A�:�>�Y�C!*}���m�чjA]�{�nT�%y:��r�CEg����{"kz2..��~�,l�"� :6�騟>�QFvP��z3�9�O���di5�L�LQ�P�tͨ�n�z��m�W�{������:���� �kn���8�����/ڨ�f�x�?#��u����c�7��t�zk^�C	m�?wi���騻�o9{��$Wr������t�gq��َ�e�?��྇�Z)Id>��9����>�W�]��๎ѕ������M~������<["o� ��ea'�Q]�M����x�lzC�C�>5�,��o��[�_H����Vf}1��Qݑ۸߿mʽ������+ķ�/^���:�      �      x������ � �      �     x�}W�vܸ\K_��lZ=�-gֲǞ�'��9��$o7a� �G����'��R�TKrr�ۭ��>��-\]�}�E��m�m�ٳͳ�W���K5���g��|��z�C���s��[�j���N���E�����Q�9�0{t��&�$q��+1n��y-7ޟ��a��6m�I���>�J����D�|P7�����_�۪��vx�V)� ������&��
M'.m��X��Fiځ�)�Ӓ?�;S�q���NX��	ۃ�B�}�Ka�Vq��Gw�qz����ie�i�[myZ�#�3���[\��Yĵ�A�b��!VL��)]����ޏ#��:D�]Rc����8)ݶ#�7诈[o���n��9�{q�A�p���%��/_��{��(	��IP�h��b �%$m��2&bn{��ޝ��o�F]���){���S0ک�67���x���p[��F,f��0�>��8چ�����fR/~�r�����;z���D/��p�:iͭ�篠mό�>��	��y�0�XI��3��A;�H2����>���y��t��)ۑ��4`�z��F=g_[ a�$�L�r�>��N�3�re�]Q��M���rYGc9��	KML�:�n1/��2n��J%�w'I�f�K]a�ɏ\�C�������
�2M��i����N
_,�,�󈜶KT?��r��L�b���ר�Q!0Ap+���3=2^�d���`�ǽրѰ={q~���֝��ʻh1��%?���/�ޙ�!�*���u��Ͻn�0��a��m�)���`ڄ}2)��4��"N�SO�u�`*��=�o�KIa�~����Sb��e�0�tǶH��QE��̋'�SA`V�t��S�>�ؠ�0/�A�W���`v�����Ú)$��8���2C��[��y�4fX�!��zVR1uB���,H�TVd�����uu���C�ff�(q_=��X�	(�hɬ<���a/��JE[k�	�{ʡ@\����qil��G4��e��E���_��+��֡+Mz��'����B��<D	⤲®�Yߕo��$G�g��N}�E��Ni�1�c�j�F�q����$�_��m������{��dZrd�	vRN���Qڨ�����86��;0˯� ��Y���f�!���Yd�����[0�~ꓐm宵9r1����#B�tJ��ZxS�.n������U8&��#��a��(W���]�ܻ�8����,L�h5ϊ%���@w�@����GM�A)��Q7���x�.����q !�f��Td<��u��]��<
!y�{��[�����L�������BV���"����>�0���F5�w\&�5��ZHO]Qq�
�17hm��j���W������`�ps�I������l�R ����32%X�%�8].�z
(v�Kg�V��g�ϯ^������ۦ�g[�|8Q�'�K�����K�Ģ��A���۠G�̙���W��?
���j����f)�
0z�+vZ�=ھ`�Z����/t\(�F	zj1�BzM�w]<mA�K�������>��Z0��zՀ���L�ᡄ��Guq�8U�'O�^��=�iQ�0y��lԟ������g�	Er]����$6�F��[x�:��W��>����5�FCZ?@%l�/��@y�@U�Ly��@nn�{��oߐ�O�f�P�e�S=�؇���ڂj(����&�L_�L
�e �a�H�S� i�//�h�I]�짗H�V�����(��Jo)p
K���ޖ�Z��2w����-�zmا���=�"��	)����+�澰���$��J1l����J�'�c q�7��|&@Phz}LU
_}��Sz`�g��y���*�v���J�w�M����tx˄"��(1�b� ��?�L>p��elwM�-�6��1.�j�ޢi����i�5��TVU��b��C�&Rt�(��Y�])~�|5�j�$�K+372��M�No��Z�
K,e;+X�o���W���_;`Z3�uֆ��;����������8�21      �   �  x��XMs�8=;��uMRK�l�s}�rřL2�I6�f��rIHD, ��=͏�����%��R�,O��e�"�ݯ_���m_J->+iěeT��I��b~<?��62�������X8O��n�?�tV�����*�F�B
<���X+��ұ���ke��� �
"�~��RD'n�܊�鼴��_.Ng����AU��0`Bg�L|itH�٨^Z�Е�Q����#���Q����A���AYa�_*���/�k��XuFZ2�����r��J��98�k�['+5Ű�P3:t�{:�)[iq"��e�$l�6�-Ūq]GG/��*�6[�G/m�U��r�83�o����Rգ��Q�?���G2�^6?1����)�������G���\���z��͵�8ⓒ�H$ �����g�#�;(�_���9)�NϷ�_Ն	p2�d���.@����֕��2H:R�a�2ή덤KX�0�S����J�V�Vʸ�È�'���w�X�� ��r���6~��I�%�ʮ9;�ѡ�����\��VG����W�}�*�e#�:�9Q'��==?|U���(c�������/K�?�C�>�XG6����+xt�[��uA1+�ԗ#~��w�(���@7 p�.F� mٯ�8ǌ&�������ץt�p(rJôU�]�<������W]z��;.r���iܺU+�0􅪯��@��*B�u\o�%M��g }�B�@��P���!hPb�Y3�b�eK���	�I���ݦ���u��oב��i���[z�5(�'����O�E�)5c�?'ƨ�R��Y�P.�2����TK�J���W8��=H5h��3)�F��CJ��4�Dݬ��d�p��5 _!���;��@*bр#ը�t�3_�)W9T���y�l�j��f�p-s��Rt���YX���Ȥ��x�{�)In@�=�)DokT@�8�Ev���2�+�P��t��Be%���N��U���/��Q��@|%Y�&�W ���__�b��BR̯�e�H��wL���8 ǅjTL�F�`�7�­I76�0�z� �C���P�}2M�<�\�b��JPuiUjx��9'�� L���BM3��R]~���6��C�oW���50{o��z$�|�#��8�@pH���t�hQ���O󗬅��bG�$}I2��.��L�8��1dѡ4~g�JR��D�E5�X0���Q޻Ɗ_�P����L�}V��ީe5���G���+����z��<-�=j�A��h���G`��l5!a+���@*k���gT� ��_$�G�O �����#Nv�'�/t���^�﬷D�'(����fSI.Q'�SO�k�?�Z2}~���d��f��9m\ϣG����Ǘ�@���R%�˽�Y�H#�V���;�1�St�i���o���dϓS�ZrCb�[R��2��W�K�I3g����գK�uG$0�a+˟6�&͞��m�@���寧�O=��ӊ�o�b�Iq�b�sM�Q&i�i:�&Xn:���1�R�WǇ����;ߢB,��V����,z�J~�6#f�n{M��%���Iy��]�3F�ijęV���{^?;Íj\�x�'D>�ۭ��m�-�D
@b-$��qO�"@2�g��8�MG۷���Fzn�Ӟ@L�%�a�
*Y� �����ݤ˥�IZ��O���2	�����8-,�>O�P�}Z��y����G�^v&�1�aMm�W��C#�$��
�f��d](�oŠO�?� ���$�PK3,�ky�+��A%��6c�
����B�͘����q���G�g��4C���c+��ʋ�ɛ�IǾa�Abk�DFh��Z��[�t��zm%f3���0]���8�qTL�!��s!~�T�)�P�i�BQ��RF�t���"+;���V�Bz�\���,�i̡JO�!�'c��(��d4Q}!�4�o���	,Ͱ�S�tT�Ĉ'i�ӝd���t���e�d�ب���I���{2m��%j������[���27�]i���V$���J��y�m�
/4ӵ������@������m�Ԫ�&j��S��#E�H�#��@��tc��0�p�~�W"B�R?�f�fЋ�J�bw�L_�)�Y�h��,8�k�X���a2L��J-6�)}����)�����/�?��dYpW��a�����*	�v2~���b ��*�^1��	.��\�+�M����*.kun������˳㋫����Yg�D���������������|�����\��6{���� [���      �      x������ � �      �      x��[ے�Fr}�|E�,;�m���6��{�Ǝ,=X�P�$��*�C9��a�?��_ⓙU����GhB�$.Yy9y�ҷ��o�n�����M�1�^7ͥϔ��ck�A�Տu��Qo�l���?���_T?g:����]��8�O�
��Ϩ�+M�_�������Tjz�;s0����Ա�{e>����Q�׃o�%u�ލ]/�Goz����h��Rv��nkz�i̎^Y���@ze;6��r���P�koJ�
[=�ݪvxV��7C_��n��K�n�P�Z[��S�8<��e�s;v��m��4��q8��Z��vt�i��t�QJ�4�/'qI,语�V>��]�g�����^��ꃅr+ՙz���罵�[�����ѕ�۝�өʐ9p5�ُCo�dU�{_��f�
os}=���2���n�cӜT9��XƱU� �պ�C��5��Xs���sG���Q�k֭ti�����3	2w��l'�
��_|�
���%����~����^��
:��k+iV����F���r�D�j����J� �V�Q���8yr�i�;���
:�t����,��}���:eI�n���v]p��-��c5�[��i -\�ٱ؍]����vN���,�{�v�CZ�Aj��V��39���¹L�!�(�뒼���Iݛ��H$6y8�γX��/c�C�tZv�V?�C;��}�cmu[7�	��vk���'M�;H��-�M$�K��9Y2�W�F��Ɛ����O�i9dB��V'RS�Az1|r���`q�>E�q�vc�����cW����.�s~�����H�O7�8�)��!VFA���
 ���UU��)�F�:��2�'�[T7 �qL�(8�0M�ʍ�2"�y��&�HX�������X,��j��{k�(#�#sB�6#�
��U�_���b$�g7c�T��c�����@o��΅o�س��_FX؟��gX�I���i{;�#z��\;�9��mߤ#�k�<������
�����.Kr1��	��r���;�RozJ*�4���Q�I����b��Q��>�',V׋��������z�VO�W�W���ۛ�����z��b]���]q_<��S��.V�b������w7��܍������ʞ��G;>��0�ؤ�-8+E����N0�@����
�f��0v1Ba�L��K^�Q�$���
_�<�@������\WN�O��6‎DqǺ�o7-���STP�Y�vY�: ��� >{����,���!b��yfwj_�P =����N��4� �|����I����Ք89ô��ɖ��P�(��J�*��Ɣ&(�=�C�W�~�G��:��v@2�8�GxE�3<�P��oG�т{�����P��:�ꖯ�<�l=���c�y���X*z���]
��ct����������������z�Wۋ$1��F;��������ĕѷ�02_b	=|B@�3�q�Yl�=�N[t��Dp�dC�����@�*�@�p� ��E�����Iؘj��wC+��&)�N�8��wn9�)9[B>�"( <��/�B �ql��2hL3(�3#�3��� Б`�Dj���R�c�r���䅠���,
95�@�T�`z��u���J�6�>�*�r���GB��I��(�Ӝ�)��)�gr�gb�/j8�)��<W�ϔTȩ''}�/â��7�b����5L��mc>s����o%?��Ed ���= Fw�w�AoH�\;���AUD��� q�8AUW���P��N�qqw�t���D6)Kk�#a�R��|�Hڌ'���X(��6%{v�P�U�y)ʨ�ߍ�;�a��$�	�/���Ͳ�v� /�m�[�y6��oՕ��+&B�W	0R}¸�g�`$L�%���c2Q�:DG9�Q)_ց+��M�m��H�b�2�`r�S��µ8����.��HUm����J@j=�	L r�'����`��/8�($��s<yO��O} ��4��'��� Wo�r�R�%e�y�Ň�LI�w\�³�r{���jl�J2��>i��q�@����/�M�L�U� z�nM�j2-.���=�Yj�`�PC3r���9��P� ��S(�9!BJP����l��S$\ߩu���U��;p�B����� ߌ��%�c����g��$���&�_���f>�70@��������WM_���!x���-��/\>���بQ���a����D���9kפ��%�ӈd�b�'Y�%xt�3��\.�����~��:�@�� ˧��D��l���B�,�J$=䠛�K/QP:
���}ʭ��N �K��K[Fr����gȡ{V[R�96ۺ	x�Ř:B!�_�@g�Q[Õ�O|Y�`�P��Q���j�"�H���y(;"R(( �ce��Y���Vpn2�3���-GB**[,��O��=�2I�\3�:�L���m,�T�e���*�
���A2K�wL�ׯn�A�>!1
N ]���g�d��i��p��?&��W�P@�;8¾�S��M��8���^Z��o�S���}`�� z'/@^�^�'b�0L�1��ku���E�M�n�?��ȱI��z7FE_ގSCb��u�0�^�{�aW?𖑹������Z�_�[���S&����e��΅��zX~�Y#L�ty�d����t	��@���K�h	'�~��[�T�s�f�R�������[�1�zɬ��<�F��&���ez�MQ���
�X�1vn������N�"{O]c⹈�-��M��,r$j+>໬@|I�GxD-F7i9)BTo�P��^��	��2�ޒ���D�!����u�T!L�� �;�Ή⁊�>A]V8�)�8
5�#d�U�gz�Z�fy�嫩}/�"�5I取a�a7��=B�)���n"!roBԏ�M����b>�K�a_��!�7���/��]���VӉQ<�s��󔵲�_�o9�3*�L6�@�t�n�v����q��
Q"�6�"NZ���r�02��)�o��K��TdJ5}Gd��YB�3L��e�YF�ܼ�v�����^ _�ec���R5F�ʃɚ��)G�G�]/=!n�Ǵ���b|��M��R��අ��KCM[ o���:SRӝ4S.��N�&�IpwCK�0�%�l�z25���l�!e?�����K���Y��,&Y�Ig�:���Zց�K	\:Iq;yY�	�pEg��8�$C�ʴdH����0�u�����nT�4�㓄lG�#�hQ �%@SIEn4Pß����Gc�p��%���`;rM�؍7c�`3�g�#��4T�)��ר*܊~�k�	��c��$ɶCַ��I����C%�~;�jsp��6��
����T��Lv�����Y���0�}�+�2�M�^f<�>j���=ʺ!&� K�l����������Q��m��nq��Y��<�����ֿ��߮^�n�׏�������W�Wk�����{¿�
�.�����Oa�3�+��e��h����05����(��W�ы}V3S�yZ�G��DVo��;)�٫�D.���t3py��^��M��@HU����B��H�P����G��MZ��O~M.�������#3�K^���:T���G����w�e:8�>0��S��	�Wư�*�kכ���2T~+�ϘE=+�a'Rb�q��A���"��dPSU�䤇'#��`��J�
׷s�,�jbƉoC6�0�Jj�̝�p�H֝�=�)��Ix�NU�$*I[��,,8��^?�Vᏼ�Tl�K���\)'L����Л��f�H�6�=�(3r;r6�k��PNPh��χ��hV�^��̗�#s�,L�(_���P˼��-��g��t3��@;Mb-��xE����*rn*�g"{<[��h �Q�<�M����I�Gr_���tSSehu�Wy��[?g��S��`iXM���Y�pF	���Lӕ�,�ĮKQ�hT���C��j����`�Y=��b�+�guH/�g��U��8��2�c�JM�ψİ{�E[� h  �ۆ��6$�}�_��^���e��Htc'+�[���Ѻ7MQ��9��5yp�0��&tE@b��=l�~�����C�P�ׂ:�>�"���o}������i�&�~u�Š,�2�V�`�f�<k�Cr�l�ovVql��p2��O��|�1��N�
�Avø��h�~a��Mh�YS6v��B�P�)���c��b_�1�?�������V��}ی���YL?	O�W�ƅX���ir�f��:ڰ�L��*��9�����M*�9�R}o��S�"doh�'�SO�?�V3a;��Ćx�e�l2�2��e�M
�Cm�q��5�ō�ҭ;ې;����?��r�b���Yc{>�r�'ڂ��=Zġ{��L�lw���v��S<J����l�W�IPn�o����]�!mh���UKN��r{*��C�1xTT�t�ʬ�n��d{a9����^EV�ei/�X�糂�����g��2��~��&,y߅1Y�0�Sg]�����A�����G\F����맕Ԃ��ȳ<	������Or��� �������2ۙЧ4a�ſ���=j���,@9L�<�1��){͛�����V��`0����Ei��vM�m��:E)-V1���[$�-��փ�Է�7hY
���D�`�9�t'���]���lYSFS��<yr�����'�O���� �!�⋹����#4��p2�T��ݎ�֡Lu�8-V�?�d�9β�K��O��6�d鬠!����N�:��hٔ��26�9���Cޟ��\�voin��tXr�F$1
���m.��G�l���I�М�\�RN<�&�~o�*�r;���|�m�(����S�DT�g��T(��x���a�*�S��|W}��;���F��Tc)���w�<��L��:K'EJ�[攔s����Αsg��Ⱥ0#���p���ug3�� [�@����؅%�N�=��1/a�8�ჯ��`�3q���ĕ�^�W�{z[A}qZI�I�/�;����l����j�ak�e����ZwT)2<����/+��Jo�+O�w�'#v\adY�Jtl8_LZ���O��,�[287��՝EM��:��IHpd}Uh��N2�0_���J�Ƿ�;[���Y��[O��ǷT��M��P��__߼��]^?\?^��7|��x���t��V����N��Z�0h��e��i[)4�R+�#��Sj���ãx]3����({e�H=��O�+�����-� ЙV�yPXL��>>�\O Ԗ�����'� iGˢ7v��I�Iq�+�D��eլқ��k�ojL�D��	*�v Bq�~v{{���^�3��t��ý9��v:2��"=P��36N�^��M4q�8a!J��Ϛ�j�,�M����q+�F��穜,6��SJ�%5�e��Ψ[���[R�o�=..B��e�:>L��-G�yM��˗e!��eA۸�," !~�eO���ġ�8V���ǊZqGN�Δ㐤��_N�L,�e�s��}��r��@�/U��B#�J����\r>���e>YW h�=�i5�0<���� ]�
F`��32�G�$Ƌrl^�e�6]��b1��
�8� R��d��U%���M��/5I������Įu�<�����r�9�j���@˻�g��;e�ͩ����4f�����:��ٕy�.����0s1���	�^6�!r�H>땝�bA��uBk��9�?y��{����GW�?&��I�S�ǫ�m��=�+m��ށ&��s^I�=�+!����X�\�\���M�P��o�]^�<���ݪ�Vm��DMY�,o�r���1y7�bE�d5����`��؞��1�q�i�����W�^��d�      �   �   x�M�=�0���9EOP%���R�����YH*RUE��O������P�$0L���X�d�y�(��ܚ��좤,�a�5�p����-j���L_A�'VaؖQҲΐ�?3��_W��.i�;bgj�Ї�Q��k�6���\��*��5�      �      x������ � �     