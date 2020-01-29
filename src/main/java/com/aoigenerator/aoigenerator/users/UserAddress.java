package com.aoigenerator.aoigenerator.users;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class UserAddress {
    private String zipCode;
    private String city;
    private Countries country;
    private String street;
}
