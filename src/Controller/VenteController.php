<?php

namespace App\Controller;

use App\Entity\Vente;
use App\Repository\VenteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use function Symfony\Component\String\s;

#[Route('/api/ventes')]
class VenteController extends AbstractController
{
    public function __construct(
        private VenteRepository $venteRepository, private ValidatorInterface $validator,
        private SerializerInterface $serializer
    )
    {
    }

    #[Route('/', name: 'app_vente_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $ventes = $this->venteRepository->findAll();
        $jsonVentes = $this->serializer->serialize($ventes, 'json', ['groups'=>'pain']);

        return new JsonResponse($jsonVentes, Response::HTTP_OK, ['Content-Type'=>'application/json'], true);
    }

    #[Route('/{id}', name:'app_vente_show', methods: ['GET'])]
    public function show(Vente $vente): JsonResponse
    {
        $jsonVente = $this->serializer->serialize($vente, 'json', ['groups'=>'pain']);

        return new JsonResponse($jsonVente, Response::HTTP_OK, ['Content-Type'=>"application/json"], true);
    }

    #[Route('/', name: 'app_vente_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $formData = $request->getContent();
        $vente = $this->serializer->deserialize($formData, Vente::class, 'json');

        $errors = $this->validator->validate($vente);
        if (count($errors) > 0){
            $errorsString = (string) $errors;
            return new JsonResponse($errorsString, Response::HTTP_BAD_REQUEST);
        }

        $this->venteRepository->save($vente, true);

        return new JsonResponse(null, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_vente_update',methods: ['PUT'])]
    public function update(Request $request, Vente $vente): JsonResponse
    {
        $formData = $request->getContent();
        $updateVente = $this->serializer->deserialize($formData, Vente::class, 'json', ['groups'=>'pain']);

        $vente->setRecette($updateVente->getRecette());
        $vente->setProduit($updateVente->getProduit());
        $vente->setMontant($updateVente->getMontant());
        $vente->setBenefice($updateVente->getBenefice());
        $vente->setReste($updateVente->getReste());

        $errors = $this->validator->validate($vente);
        if (count($errors) > 0){
            $errorsString = (string) $errors;

            return new JsonResponse($errorsString, Response::HTTP_BAD_REQUEST);
        }

        $this->venteRepository->save($vente, true);

        return new JsonResponse(null, Response::HTTP_OK, [], true);
    }

    #[Route('/{id', name: 'app_vente_delete',methods: ['DELETE'])]
    public function delete(Vente $vente): JsonResponse
    {
        $this->venteRepository->remove($vente, true);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
