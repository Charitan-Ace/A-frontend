import axios from 'axios';
import { PROJECT_URL } from '../constant';
import { GetProjectsInput } from '../schema/get-projects';
import { ProjectDto } from '@/type/project/project.dto';
import { APIResponse, ValidationError } from '../../axios';
import { ProjectCategoryEnum } from '@/type/enum';


const getProjects = async (input: GetProjectsInput) => {
    const {page, pageSize, category, status, q} = input;


    let queryUrl = `${PROJECT_URL}?status=${status}&category=${category}&_page=${page}&_limit=${pageSize}`
    
    if (category === ProjectCategoryEnum.ALL){
        queryUrl = `${PROJECT_URL}?status=${status}&_page=${page}&_limit=${pageSize}`
    }

    if (q && q !== ""){
        queryUrl = `${PROJECT_URL}?status=${status}&category=${category}&_page=${page}&_limite=${pageSize}&name_like=${q}`
    }

    try {

        let totalPage = 0;

        const extractPageNumber = (link: string): number => {
            const pageMatch = link.match(/_page=(\d+)/);
            return pageMatch ? parseInt(pageMatch[1], 10) : 1;
        };
        const { data, status, headers } = await axios.get<
            ProjectDto[]  
        >(queryUrl);


        if(headers["link"]){
            const links = headers["link"].split(",");
            const lastLink = links[links.length - 1];
           totalPage = extractPageNumber(lastLink);
        }else{
            totalPage = 1;
        }

        return {
            data: {
                data: data,
                pages: totalPage,
            },
            status: status,
        } as unknown as APIResponse<{
            data: ProjectDto[],
            pages: number
        }>;
    } catch (error) {
        if (!axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
            return {
                data: null,
                error: JSON.stringify(error),
                status: 400,
            } as unknown as APIResponse<{
                data: ProjectDto[],
                pages: number
            }>;
        }
        return {
            data: null,
            error: error.message,
            status: error.status,
        } as unknown as APIResponse<{
            data: ProjectDto[],
            pages: number
        }>;  
    }
}

export {getProjects}