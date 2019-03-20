package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Pet.
 */
@Entity
@Table(name = "pet")
public class Pet implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "client_id")
    private Integer clientId;

    @Column(name = "age")
    private Integer age;

    @Column(name = "species")
    private String species;

    @ManyToOne
    @JsonIgnoreProperties("pets")
    private Client client;

    @OneToMany(mappedBy = "pet")
    private Set<Appointment> appointments = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Pet name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getClientId() {
        return clientId;
    }

    public Pet clientId(Integer clientId) {
        this.clientId = clientId;
        return this;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public Integer getAge() {
        return age;
    }

    public Pet age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSpecies() {
        return species;
    }

    public Pet species(String species) {
        this.species = species;
        return this;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public Client getClient() {
        return client;
    }

    public Pet client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public Pet appointments(Set<Appointment> appointments) {
        this.appointments = appointments;
        return this;
    }

    public Pet addAppointment(Appointment appointment) {
        this.appointments.add(appointment);
        appointment.setPet(this);
        return this;
    }

    public Pet removeAppointment(Appointment appointment) {
        this.appointments.remove(appointment);
        appointment.setPet(null);
        return this;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
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
        Pet pet = (Pet) o;
        if (pet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pet{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", clientId=" + getClientId() +
            ", age=" + getAge() +
            ", species='" + getSpecies() + "'" +
            "}";
    }
}
