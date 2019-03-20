package io.github.jhipster.application.domain;



import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SystemUser.
 */
@Entity
@Table(name = "system_user")
public class SystemUser implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login")
    private String login;

    @Column(name = "logo")
    private String logo;

    @Column(name = "jhi_password")
    private String password;

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToOne
    @JoinColumn(unique = true)
    private Doctor doctor;

    @OneToOne
    @JoinColumn(unique = true)
    private Client doctor;

    @OneToOne
    @JoinColumn(unique = true)
    private Admin doctor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public SystemUser login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getLogo() {
        return logo;
    }

    public SystemUser logo(String logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getPassword() {
        return password;
    }

    public SystemUser password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public SystemUser deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public SystemUser doctor(Doctor doctor) {
        this.doctor = doctor;
        return this;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Client getDoctor() {
        return doctor;
    }

    public SystemUser doctor(Client client) {
        this.doctor = client;
        return this;
    }

    public void setDoctor(Client client) {
        this.doctor = client;
    }

    public Admin getDoctor() {
        return doctor;
    }

    public SystemUser doctor(Admin admin) {
        this.doctor = admin;
        return this;
    }

    public void setDoctor(Admin admin) {
        this.doctor = admin;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SystemUser systemUser = (SystemUser) o;
        if (systemUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), systemUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SystemUser{" +
            "id=" + getId() +
            ", login='" + getLogin() + "'" +
            ", logo='" + getLogo() + "'" +
            ", password='" + getPassword() + "'" +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
