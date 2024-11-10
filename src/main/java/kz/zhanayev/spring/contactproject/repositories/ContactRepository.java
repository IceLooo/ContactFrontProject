package kz.zhanayev.spring.contactproject.repositories;

import kz.zhanayev.spring.contactproject.models.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
