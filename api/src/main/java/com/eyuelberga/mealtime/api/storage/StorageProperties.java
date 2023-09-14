package com.eyuelberga.mealtime.api.storage;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * File upload configurations
 *
 * @author Eyuel Woldemichael
 */
@ConfigurationProperties("storage")
@Data
public class StorageProperties {

	/**
	 * Folder location for storing files
	 */
	private String location = "uploads";

}
