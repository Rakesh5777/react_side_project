from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/optimisations", summary="Get all Optimisation rules")
async def get_optimization_rules():
    optimisations = [ [], ['optimisation1', 'optimisation2', 'optimisation3']]
    random_index = random.randint(0, len(optimisations) - 1)
    return {"optimisations_detail": optimisations[random_index]}