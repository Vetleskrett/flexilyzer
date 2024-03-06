
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

def extract_and_load_module_from_zip(zip_path: Path):

    group = zip_path.stem
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(f"/app/tmp/{group}")  
    return load_module_from_path(f"/app/tmp/{group}/{PYTHON_FILE_NAME}")


class TestMathFunctions(unittest.TestCase):
    module = None 

    @classmethod
    def setUpClass(cls):
        cls.module = extract_and_load_module_from_zip(zip_file_path)

    def test_add(self):
        add = self.module.add
        self.assertEqual(add(1, 2), 3)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(-1, -1), -2)

    def test_subtract(self):
        subtract = self.module.subtract
        self.assertEqual(subtract(1,1),0)
        self.assertEqual(subtract(10,6),4)

    def test_multiply(self):
        multiply = self.module.multiply
        self.assertEqual(multiply(1,1),1)
        self.assertEqual(multiply(10,6),60)    
        self.assertEqual(multiply(13,13),169)    

    def test_check_number(self):
        check_number = self.module.check_number
        self.assertEqual(check_number(1),True)
        self.assertEqual(check_number(-10),False)    

    def test_list_if_numbers(self):
        list_of_numbers = self.module.list_of_numbers
        self.assertEqual(list_of_numbers(1,5),[1,2,3,4,5])
        self.assertEqual(list_of_numbers(-3,3),[-3,-2,-1,0,1,2,3])    
        
    def test_duplicate_letters(self):
        dup = self.module.duplicate_letters
        self.assertEqual(dup("hei"),"hheeii")
        self.assertEqual(dup("bob"),"bboobb")    

    def test_remove_vowels(self):
        rm_vowels = self.module.remove_vowels
        self.assertEqual(rm_vowels("hei"),"h")
        self.assertEqual(rm_vowels("og"),"g")    
        self.assertEqual(rm_vowels("onomatipoetikon"),"nmtptkn")  

    def test_modify_list(self):
        modify_list = self.module.modify_list
        self.assertEqual(modify_list([1,2,3]),[2,3,1])
        self.assertEqual(modify_list([4,5,6,7]),[5,6,7,4])    
        self.assertEqual(modify_list([6,2,8,1]),[2,8,1,6])  

def simplify_description(desc: str) -> str:
    """
    Simplify and clean up the failure or error description.
    """
    lines = desc.splitlines()
    for line in lines:
        if 'AssertionError' in line:
            parts = line.split('AssertionError: ')
            if len(parts) > 1:
                message = parts[1].replace('\n', ' ').strip()
                return message
    return "Error occurred, but specific details are not available."

def main(zip_file_path: Path) -> Return:
    loader = unittest.TestLoader()
    suite = loader.loadTestsFromTestCase(TestMathFunctions)
    runner = unittest.TextTestRunner(stream=open(os.devnull, 'w'))  
    result = runner.run(suite)
    
    simplified_results = []

    for test, desc in result.failures + result.errors:
        simplified_desc = simplify_description(desc)
        simplified_results.append(f"{test.id().split('.')[-1]}: {simplified_desc}")

    simplified_res = " | ".join(simplified_results)
    
    test_result = Return(tests=ExtendedBool(value=result.wasSuccessful(), desc=simplified_res))
    return test_result

if __name__ == "__main__":
    zip_file_path = Path(os.getenv('ZIP_FILE_PATH'))
    print(main(zip_file_path).model_dump_json())  