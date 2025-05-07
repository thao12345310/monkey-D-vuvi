# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application with Java 21
RUN mvn clean package -DskipTests -Dmaven.compiler.source=21 -Dmaven.compiler.target=21

# Verify the JAR file exists and show its details
RUN ls target/*.jar

# Run stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Add execute permissions and verify
RUN chmod +x app.jar && \
    ls -la app.jar && \
    pwd

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"] 