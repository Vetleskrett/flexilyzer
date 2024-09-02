import os
from typing import Optional
from pydantic import BaseModel


class ExtendedBool(BaseModel):
    value: Optional[bool]
    desc: Optional[str]

class Return(BaseModel):
    ok: Optional[bool | ExtendedBool]

def main(url: str) -> Return:
    # code goes here
    return Return(ok=True)

if __name__ == "__main__":
    url = str(os.getenv('URL'))
    print(main(url).model_dump_json())  