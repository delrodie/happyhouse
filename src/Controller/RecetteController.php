<?php

namespace App\Controller;

use App\Entity\Recette;
use App\Entity\Vente;
use App\Repository\ProduitRepository;
use App\Repository\RecetteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/recettes')]
class RecetteController extends AbstractController
{
    public function __construct(
        private RecetteRepository $recetteRepository, private SerializerInterface $serializer,
        private ValidatorInterface $validator, private ProduitRepository $produitRepository,
        private EntityManagerInterface $entityManager
    )
    {
    }

    #[Route('/', name: 'app_recette_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $recette = $this->recetteRepository->findAll();

        $jsonRecette = $this->serializer->serialize($recette, 'json', [
            'groups'=>'pain',
            'circular_reference_handler' => function ($objet){
                return $objet->getId();
            }
        ]);

        return new JsonResponse($jsonRecette, Response::HTTP_OK, ['Content-Type'=>'application/json'], true);
    }

    #[Route('/{id}', name: 'app_recette_show', methods: ['GET'])]
    public function show(Recette $recette): JsonResponse
    {
        $jsonRecette = $this->serializer->serialize($recette, 'json', ['groups'=>'pain']);

        return new JsonResponse($jsonRecette, Response::HTTP_OK, ['Content-Type'=>'application/json'], true);
    }

    #[Route('/', name: 'app_recette_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true); //dd($data);

        if (!isset($data['date'], $data['montantTotal'], $data['beneficeTotal'], $data['resteTotal'], $data['ventes'])) {
            return $this->json(['error' => 'Données manquantes'], Response::HTTP_BAD_REQUEST);
        }

        $recette = new Recette();
        $recette->setDate(new \DateTime($data['date']));
        $recette->setMontantTotal($data['montantTotal']);
        $recette->setBeneficeTotal($data['beneficeTotal']);
        $recette->setResteTotal($data['resteTotal']);

        foreach ($data['ventes'] as $venteData){
            $vente = new Vente();
            $vente->setMontant($venteData['montant']);
            $vente->setBenefice($venteData['benefice']);
            $vente->setReste($venteData['reste']);

            // Récuperation du produit concerné par la vente
            $produit = $this->produitRepository->find($venteData['produitId']);

            if (!$produit){
                return new JsonResponse(['error'=>'Produit non trouvé'], Response::HTTP_BAD_REQUEST);
            }

            $vente->setProduit($produit);

            // Association de la vente à la recette
            $recette->addVente($vente);

            $this->entityManager->persist($vente);
        }

        $this->entityManager->persist($recette);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_recette_update', methods: ['PUT'])]
    public function update(Request $request, Recette $recette): JsonResponse
    {
        $formData = $request->getContent();
        $updateRecette = $this->serializer->deserialize($formData, Recette::class, 'json');

        $recette->setDate($updateRecette->getDate());
        $recette->setMontantTotal($updateRecette->getMontantTotal());
        $recette->setBeneficeTotal($updateRecette->getBeneficeTotal());
        $recette->setResteTotal($updateRecette->getResteTotal());

        $errors = $this->validator->validate($recette);
        if (count($errors) > 0){
            $errorsString = (string) $errors;

            return new JsonResponse($errorsString, Response::HTTP_BAD_REQUEST);
        }

        $this->recetteRepository->save($recette, true);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);

    }

    #[Route('/{id}', name: 'app_recette_delete', methods: ['DELETE'])]
    public function delete(Recette $recette): JsonResponse
    {
        $this->recetteRepository->remove($recette, true);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
