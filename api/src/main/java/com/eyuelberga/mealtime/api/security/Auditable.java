package com.eyuelberga.mealtime.api.security;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@SuperBuilder
@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class Auditable<U> {

    @CreatedBy
    @Column(nullable = false)
    protected U createdBy;

    @LastModifiedBy
    @Column(nullable = false)
    protected U lastModifiedBy;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    protected Date createdAt;
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    protected Date updatedAt;



}