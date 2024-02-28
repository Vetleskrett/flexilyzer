import random
import string

def generate_random_website():
    # Generate a random string of lowercase letters with a length between 5 and 10
    length = random.randint(5, 10)
    random_string = "".join(
        random.choice(string.ascii_lowercase) for _ in range(length)
    )

    # Construct the website URL
    website = f"www.{random_string}.com"

    return website


def get_real_webpage(index):
    pages = [
        "blank.no",
        "udi.no",
        "laubet.no",
        "db.no",
        "google.com",
        "ntnu.no",
        "yr.no",
        "ufbsiufdbvks.com",
        "uib.no",
        "uia.no",
    ]
    if index > len(pages) - 1:
        return random.choice(pages)
    return pages[index]
