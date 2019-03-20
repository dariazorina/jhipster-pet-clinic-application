package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Admin;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Admin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

}
