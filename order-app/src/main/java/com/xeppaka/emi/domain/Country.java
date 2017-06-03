package com.xeppaka.emi.domain;

/**
 *
 */
public enum Country {
    CYP("Cyprus"),
    CZE("Czech Republic"),
    EST("Estonia"),
    FIN("Finland"),
    FRA("France"),
    GRE("Greece"),
    GER("Germany"),
    IRL("Ireland"),
    ISR("Israel"),
    ITA("Italy"),
    KOR("South Korea"),
    LAT("Latvia"),
    LIT("Lithuania"),
    POR("Portugal"),
    ROM("Romania"),
    SPA("Spain"),
    SWI("Switzerland"),
    TUN("Tunisia"),
    UAE("UAE");

    private final String country;

    Country(String country) {
        this.country = country;
    }

    public String getCountry() {
        return country;
    }
}
