package com.aoigenerator.aoigenerator.users;


import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

    boolean existsByPasswordHash(String username);

    User findUserByUsername(String username);
}
