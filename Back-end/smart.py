import numpy as np
import matplotlib.pyplot as plt

def initialize_road(length, density):
    # Initialize the road with a given length and car density
    road = np.zeros(length, dtype=int)
    num_cars = int(length * density)
    car_positions = np.random.choice(length, num_cars, replace=False)
    road[car_positions] = 1
    return road

def update(road, vmax, p):
    # Update the road based on car velocity and probability of slowing down
    new_road = np.zeros_like(road)
    length = len(road)

    for i in range(length):
        if road[i] == 1:
            v = min(road[i], vmax)

            for j in range(1, v + 1):
                if road[(i + j) % length] == 1:
                    v = j - 1
                    break

            if np.random.random() < p and v > 0:
                v -= 1

            new_road[(i + v) % length] = 1

    return new_road

def simulate(length, density, vmax, p, num_steps):
    # Simulate the traffic flow for a certain number of steps
    road = initialize_road(length, density)
    total_velocity = 0

    for _ in range(num_steps):
        road = update(road, vmax, p)
        total_velocity += np.sum(road)

    average_velocity = total_velocity / (num_steps * length)
    return 1 - average_velocity  # Correct for the correct velocity

if __name__ == "__main__":
    length = 100  # Length of the road
    density_range = np.linspace(0.01, 1.0, 20)  # Different car densities
    vmax = 5  # Maximum car velocity
    p = 0.3  # Braking probability
    num_steps = 100  # Number of simulation steps

    avg_velocities = []
    for density in density_range:
        avg_velocity = simulate(length, density, vmax, p, num_steps)
        avg_velocities.append(avg_velocity)

    # Plotting the relationship between density and velocity
    plt.plot(density_range, avg_velocities, label='Average Velocity')
    plt.xlabel('Car Density')
    plt.ylabel('Average Velocity')
    plt.title('Relationship between Car Density and Average Velocity')

    # Add text with the values
    for i in range(len(density_range)):
        plt.text(density_range[i], avg_velocities[i], f'({density_range[i]:.2f}, {avg_velocities[i]:.2f})')

    plt.legend()
    plt.show()
