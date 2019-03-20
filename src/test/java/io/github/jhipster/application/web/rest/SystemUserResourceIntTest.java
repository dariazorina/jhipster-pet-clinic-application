package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhPetClinicApp;

import io.github.jhipster.application.domain.SystemUser;
import io.github.jhipster.application.repository.SystemUserRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SystemUserResource REST controller.
 *
 * @see SystemUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhPetClinicApp.class)
public class SystemUserResourceIntTest {

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO = "AAAAAAAAAA";
    private static final String UPDATED_LOGO = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private SystemUserRepository systemUserRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSystemUserMockMvc;

    private SystemUser systemUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SystemUserResource systemUserResource = new SystemUserResource(systemUserRepository);
        this.restSystemUserMockMvc = MockMvcBuilders.standaloneSetup(systemUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SystemUser createEntity(EntityManager em) {
        SystemUser systemUser = new SystemUser()
            .login(DEFAULT_LOGIN)
            .logo(DEFAULT_LOGO)
            .password(DEFAULT_PASSWORD)
            .deleted(DEFAULT_DELETED);
        return systemUser;
    }

    @Before
    public void initTest() {
        systemUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createSystemUser() throws Exception {
        int databaseSizeBeforeCreate = systemUserRepository.findAll().size();

        // Create the SystemUser
        restSystemUserMockMvc.perform(post("/api/system-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(systemUser)))
            .andExpect(status().isCreated());

        // Validate the SystemUser in the database
        List<SystemUser> systemUserList = systemUserRepository.findAll();
        assertThat(systemUserList).hasSize(databaseSizeBeforeCreate + 1);
        SystemUser testSystemUser = systemUserList.get(systemUserList.size() - 1);
        assertThat(testSystemUser.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testSystemUser.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testSystemUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testSystemUser.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createSystemUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = systemUserRepository.findAll().size();

        // Create the SystemUser with an existing ID
        systemUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSystemUserMockMvc.perform(post("/api/system-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(systemUser)))
            .andExpect(status().isBadRequest());

        // Validate the SystemUser in the database
        List<SystemUser> systemUserList = systemUserRepository.findAll();
        assertThat(systemUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSystemUsers() throws Exception {
        // Initialize the database
        systemUserRepository.saveAndFlush(systemUser);

        // Get all the systemUserList
        restSystemUserMockMvc.perform(get("/api/system-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(systemUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(DEFAULT_LOGO.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSystemUser() throws Exception {
        // Initialize the database
        systemUserRepository.saveAndFlush(systemUser);

        // Get the systemUser
        restSystemUserMockMvc.perform(get("/api/system-users/{id}", systemUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(systemUser.getId().intValue()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN.toString()))
            .andExpect(jsonPath("$.logo").value(DEFAULT_LOGO.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSystemUser() throws Exception {
        // Get the systemUser
        restSystemUserMockMvc.perform(get("/api/system-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSystemUser() throws Exception {
        // Initialize the database
        systemUserRepository.saveAndFlush(systemUser);

        int databaseSizeBeforeUpdate = systemUserRepository.findAll().size();

        // Update the systemUser
        SystemUser updatedSystemUser = systemUserRepository.findById(systemUser.getId()).get();
        // Disconnect from session so that the updates on updatedSystemUser are not directly saved in db
        em.detach(updatedSystemUser);
        updatedSystemUser
            .login(UPDATED_LOGIN)
            .logo(UPDATED_LOGO)
            .password(UPDATED_PASSWORD)
            .deleted(UPDATED_DELETED);

        restSystemUserMockMvc.perform(put("/api/system-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSystemUser)))
            .andExpect(status().isOk());

        // Validate the SystemUser in the database
        List<SystemUser> systemUserList = systemUserRepository.findAll();
        assertThat(systemUserList).hasSize(databaseSizeBeforeUpdate);
        SystemUser testSystemUser = systemUserList.get(systemUserList.size() - 1);
        assertThat(testSystemUser.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testSystemUser.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testSystemUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testSystemUser.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingSystemUser() throws Exception {
        int databaseSizeBeforeUpdate = systemUserRepository.findAll().size();

        // Create the SystemUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSystemUserMockMvc.perform(put("/api/system-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(systemUser)))
            .andExpect(status().isBadRequest());

        // Validate the SystemUser in the database
        List<SystemUser> systemUserList = systemUserRepository.findAll();
        assertThat(systemUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSystemUser() throws Exception {
        // Initialize the database
        systemUserRepository.saveAndFlush(systemUser);

        int databaseSizeBeforeDelete = systemUserRepository.findAll().size();

        // Delete the systemUser
        restSystemUserMockMvc.perform(delete("/api/system-users/{id}", systemUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SystemUser> systemUserList = systemUserRepository.findAll();
        assertThat(systemUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SystemUser.class);
        SystemUser systemUser1 = new SystemUser();
        systemUser1.setId(1L);
        SystemUser systemUser2 = new SystemUser();
        systemUser2.setId(systemUser1.getId());
        assertThat(systemUser1).isEqualTo(systemUser2);
        systemUser2.setId(2L);
        assertThat(systemUser1).isNotEqualTo(systemUser2);
        systemUser1.setId(null);
        assertThat(systemUser1).isNotEqualTo(systemUser2);
    }
}
