package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.SystemUser;
import io.github.jhipster.application.repository.SystemUserRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SystemUser.
 */
@RestController
@RequestMapping("/api")
public class SystemUserResource {

    private final Logger log = LoggerFactory.getLogger(SystemUserResource.class);

    private static final String ENTITY_NAME = "systemUser";

    private final SystemUserRepository systemUserRepository;

    public SystemUserResource(SystemUserRepository systemUserRepository) {
        this.systemUserRepository = systemUserRepository;
    }

    /**
     * POST  /system-users : Create a new systemUser.
     *
     * @param systemUser the systemUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new systemUser, or with status 400 (Bad Request) if the systemUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/system-users")
    public ResponseEntity<SystemUser> createSystemUser(@RequestBody SystemUser systemUser) throws URISyntaxException {
        log.debug("REST request to save SystemUser : {}", systemUser);
        if (systemUser.getId() != null) {
            throw new BadRequestAlertException("A new systemUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SystemUser result = systemUserRepository.save(systemUser);
        return ResponseEntity.created(new URI("/api/system-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /system-users : Updates an existing systemUser.
     *
     * @param systemUser the systemUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated systemUser,
     * or with status 400 (Bad Request) if the systemUser is not valid,
     * or with status 500 (Internal Server Error) if the systemUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/system-users")
    public ResponseEntity<SystemUser> updateSystemUser(@RequestBody SystemUser systemUser) throws URISyntaxException {
        log.debug("REST request to update SystemUser : {}", systemUser);
        if (systemUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SystemUser result = systemUserRepository.save(systemUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, systemUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /system-users : get all the systemUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of systemUsers in body
     */
    @GetMapping("/system-users")
    public List<SystemUser> getAllSystemUsers() {
        log.debug("REST request to get all SystemUsers");
        return systemUserRepository.findAll();
    }

    /**
     * GET  /system-users/:id : get the "id" systemUser.
     *
     * @param id the id of the systemUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the systemUser, or with status 404 (Not Found)
     */
    @GetMapping("/system-users/{id}")
    public ResponseEntity<SystemUser> getSystemUser(@PathVariable Long id) {
        log.debug("REST request to get SystemUser : {}", id);
        Optional<SystemUser> systemUser = systemUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(systemUser);
    }

    /**
     * DELETE  /system-users/:id : delete the "id" systemUser.
     *
     * @param id the id of the systemUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/system-users/{id}")
    public ResponseEntity<Void> deleteSystemUser(@PathVariable Long id) {
        log.debug("REST request to delete SystemUser : {}", id);
        systemUserRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
