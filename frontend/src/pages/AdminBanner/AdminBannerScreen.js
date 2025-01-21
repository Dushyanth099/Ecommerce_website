import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  VStack,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  listBanners,
  addBanner,
  deleteBanner,
} from "../../actions/bannerActions";

const AdminBannerScreen = () => {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();

  const bannerList = useSelector((state) => state.bannerList);
  const { loading, error, banners } = bannerList;

  const bannerAdd = useSelector((state) => state.bannerAdd);
  const { success: successAdd } = bannerAdd;

  const bannerDelete = useSelector((state) => state.bannerDelete);
  const { success: successDelete } = bannerDelete;

  useEffect(() => {
    dispatch(listBanners());
  }, [dispatch, successAdd, successDelete]);

  const handleAddBanner = () => {
    if (!imageFile || !title || !subtitle || !productId) {
      alert("All fields are required.");
      return;
    }
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("productId", productId);

    dispatch(addBanner(formData));

    setImageFile(null);
    setTitle("");
    setSubtitle("");
    setProductId("");
  };

  const handleDeleteBanner = (id) => {
    dispatch(deleteBanner(id));
  };

  return (
    <Box p={8}>
      <Heading mb={6}>Admin Banner Panel</Heading>

      {/* Form to Add a New Banner */}
      <Box bg="gray.50" p={6} borderRadius="md" boxShadow="md" mb={8}>
        <Heading size="md" mb={4}>
          Add New Banner
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl id="image" isRequired>
            <FormLabel>Image File</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </FormControl>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter banner title"
            />
          </FormControl>
          <FormControl id="subtitle" isRequired>
            <FormLabel>Subtitle</FormLabel>
            <Input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter banner subtitle"
            />
          </FormControl>
          <FormControl id="productId" isRequired>
            <FormLabel>Product ID</FormLabel>
            <Input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter associated product ID"
            />
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={handleAddBanner}
            w="full"
            type="submit"
          >
            Add Banner
          </Button>
        </VStack>
      </Box>

      {/* Display Existing Banners */}
      {loading ? (
        <Spinner size="xl" color="blue.500" />
      ) : error ? (
        <Alert status="error" borderRadius="md" mb={6}>
          <AlertIcon />
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <VStack spacing={6} align="stretch">
          {banners.map((banner) => (
            <Box
              key={banner._id}
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <HStack spacing={4} align="center">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                />
                <Box flex={1}>
                  <Heading size="sm">{banner.title}</Heading>
                  <Text fontSize="sm" color="gray.600">
                    {banner.subtitle}
                  </Text>
                </Box>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteBanner(banner._id)}
                >
                  Delete
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default AdminBannerScreen;
