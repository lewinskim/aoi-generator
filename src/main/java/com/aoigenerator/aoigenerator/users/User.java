package com.aoigenerator.aoigenerator.users;

import com.aoigenerator.aoigenerator.entityUtils.BaseEntity;
import com.aoigenerator.aoigenerator.roles.Role;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    private String username;
    private String passwordHash;
    private String birthDate;
    private String email;
    @Embedded
    private UserAddress userAddress;
    @ManyToMany
    @JoinTable(name = "users_roles")
    private Set<Role> roles = new HashSet<>();
}
