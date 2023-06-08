<?php

namespace App\Controller;

use App\Entity\Produit;
use App\Repository\ProduitRepository;
use PHPUnit\Util\Json;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/produits')]
class ProduitController extends AbstractController
{
    public function __construct(
        private ProduitRepository $produitRepository, private SerializerInterface $serializer,
        private ValidatorInterface $validator
    )
    {
    }

    #[Route('/', name: 'app_produit_list', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $produits = $this->produitRepository->findAll();

        $jsonProduits = $this->serializer->serialize($produits, 'json', ['groups'=>'pain']);

        return new JsonResponse($jsonProduits, Response::HTTP_OK, ['Content-Type'=>'application/json'], true);
    }

    #[Route('/{id}', name: 'app_produit_show', methods: ['GET'])]
    public function show(Produit $produit): JsonResponse
    {
        $jsonProduit = $this->serializer->serialize($produit, 'json', ['groups'=>'pain']);

        return new JsonResponse($jsonProduit, Response::HTTP_OK, ['Content-Type' => 'application/json'], true);
    }

    #[Route('/', name: 'app_produit_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    { //dd($request);
        $jsonProduit = $request->getContent();
        $produit = $this->serializer->deserialize($jsonProduit, Produit::class, 'json');

        $errors = $this->validator->validate($produit);
        if (count($errors) > 0){
            $errorsString = (string) $errors;
            return new JsonResponse($errorsString, Response::HTTP_BAD_REQUEST);
        }

        $this->produitRepository->save($produit, true);

        return new JsonResponse(null, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_produit_update', methods: ['PUT'])]
    public function update(Request $request, Produit $produit): JsonResponse
    {
        $jsonProduit = $request->getContent();
        $updateProduit = $this->serializer->deserialize($jsonProduit,Produit::class, 'json');

        $produit->setNom($updateProduit->getNom());
        $produit->setPrix($updateProduit->getPrix());

        $errors = $this->validator->validate($produit);
        if (count($errors) > 0 ){
            $errorsString = (string) $errors;
            return new JsonResponse($errorsString, Response::HTTP_BAD_REQUEST);
        }

        $this->produitRepository->save($produit, true);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}', name: 'app_produit_delete', methods: ['DELETE'])]
    public function delete(Produit $produit): JsonResponse
    {
        $this->produitRepository->remove($produit, true);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
