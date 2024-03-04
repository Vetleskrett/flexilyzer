import unittest
import importlib.util
import os
from typing import Optional
from pydantic import BaseModel
from pathlib import Path
import zipfile

class ExtendedBool(BaseModel):
    value: Optional[bool]
    desc: Optional[str]

class Return(BaseModel):
    tests: Optional[bool | ExtendedBool]

PYTHON_FILE_NAME = "main.py"


def load_module_from_path(path):
    spec = importlib.util.spec_from_file_location("module.name", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

def extract_and_load_module_from_zip(zip_path):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall("/tmp")  
    return load_module_from_path(f"/tmp/{PYTHON_FILE_NAME}")


class TestMathFunctions(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = extract_and_load_module_from_zip(zip_file_name)

    def test_add(self):
        add = self.module.add
        self.assertEqual(add(1, 2), 3)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(-1, -1), -2)
        

def main(zip_file_name: Path) -> Return:
    # code goes here
    loader = unittest.TestLoader()
    suite = loader.loadTestsFromTestCase(TestMathFunctions)
    runner = unittest.TextTestRunner(stream=open(os.devnull, 'w'))  
    result = runner.run(suite)
    
    test_result = Return(tests=result.wasSuccessful())
    return test_result

if __name__ == "__main__":
    zip_file_name = Path(os.getenv('ZIP_FILE_NAME'))
    main(zip_file_name).model_dump_json()  
